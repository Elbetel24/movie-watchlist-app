// src/utils/similarity.js

// Builds a vector where each dimension is a genre or keyword ID.
// Value = 1 if the movie has that genre/keyword, 0 otherwise.
export function buildFeatureVector(genreIds = [], keywordIds = [], vocabulary) {
  return vocabulary.map((id) =>
    genreIds.includes(id) || keywordIds.includes(id) ? 1 : 0
  );
}

export function cosineSimilarity(vecA, vecB) {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    magA += vecA[i] ** 2;
    magB += vecB[i] ** 2;
  }
  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}