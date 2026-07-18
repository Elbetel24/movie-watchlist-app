// models/Movie.js
const movieSchema = new mongoose.Schema({
  tmdbId: { type: Number, required: true, unique: true, index: true },
  title: String,
  originalTitle: String,
  overview: String,              // used for TF-IDF text vectorization
  posterPath: String,
  backdropPath: String,
  releaseDate: Date,
  genres: [String],              // ["Action", "Sci-Fi"] — used for feature vector
  keywords: [String],            // TMDB "keywords" endpoint — great ML signal
  cast: [String],                // top ~5 cast names, optional but helps similarity
  director: String,
  runtime: Number,
  voteAverage: Number,           // TMDB's own rating, useful as a popularity prior
  voteCount: Number,
  popularity: Number,
  language: String,

  // Precomputed ML fields (filled in by your Python training job, not by users)
  combinedFeatures: String,      // concatenated overview+genres+keywords, ready for TF-IDF
  embedding: [Number],           // optional: store a vector if you move beyond TF-IDF later

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});