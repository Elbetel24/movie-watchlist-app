// src/hooks/useRecommendations.js
import { useState, useEffect } from 'react';
import watchlistService from '../services/watchlist.service.js';
import { getMovieFeatures, discoverByGenres } from '../services/tmdb.service.js';
import { buildFeatureVector, cosineSimilarity } from '../utils/similarity.js';

export function useRecommendations(topN = 12) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Get everything the user has interacted with
        const [watchlist, watched] = await Promise.all([
          watchlistService.getWatchlist('watchlist'),
          watchlistService.getWatchlist('watched'),
        ]);
        const seen = [...watchlist, ...watched];
        if (seen.length === 0) {
          setRecommendations([]);
          return;
        }
        const seenIds = seen.map((m) => m.movieId);

        // 2. Fetch genres/keywords for each seen movie
        const seenFeatures = await Promise.all(
          seen.map((m) => getMovieFeatures(m.movieId))
        );

        // 3. Build a shared vocabulary of genre+keyword IDs from the user's history
        const vocabSet = new Set();
        seenFeatures.forEach(({ genreIds, keywordIds }) => {
          genreIds.forEach((id) => vocabSet.add(`g${id}`));
          keywordIds.forEach((id) => vocabSet.add(`k${id}`));
        });
        const vocabulary = Array.from(vocabSet);

        // helper: prefix ids so genre/keyword id collisions don't merge
        const toVec = ({ genreIds, keywordIds }) =>
          buildFeatureVector(
            genreIds.map((id) => `g${id}`),
            keywordIds.map((id) => `k${id}`),
            vocabulary
          );

        // 4. Build the user's "taste profile" = average vector of everything they've seen
        const seenVectors = seenFeatures.map(toVec);
        const profile = vocabulary.map(
          (_, i) => seenVectors.reduce((sum, v) => sum + v[i], 0) / seenVectors.length
        );

        // 5. Pull a candidate pool based on the user's most common genres
        const genreCounts = {};
        seenFeatures.forEach(({ genreIds }) =>
          genreIds.forEach((id) => (genreCounts[id] = (genreCounts[id] || 0) + 1))
        );
        const topGenres = Object.entries(genreCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([id]) => Number(id));

        const candidates = await discoverByGenres(topGenres, seenIds);

        // 6. Score each candidate against the profile
        const candidateFeatures = await Promise.all(
          candidates.slice(0, 30).map(async (c) => ({
            movie: c,
            features: await getMovieFeatures(c.id),
          }))
        );

        const scored = candidateFeatures.map(({ movie, features }) => ({
          movie,
          score: cosineSimilarity(profile, toVec(features)),
        }));

        scored.sort((a, b) => b.score - a.score);
        setRecommendations(scored.slice(0, topN).map((s) => s.movie));
      } catch (err) {
        console.error(err);
        setError('Could not build recommendations.');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [topN]);

  return { recommendations, loading, error };
}