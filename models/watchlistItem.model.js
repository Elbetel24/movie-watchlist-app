import mongoose from 'mongoose';

const watchlistSchema= new mongoose.Schema({
 user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movieId: {
    type: Number, // TMDB movie id
    required: true
  },
  title: String,
  posterPath: String,
  status: {
    type: String,
    enum: ['watchlist', 'watched'],
    required: true
  }
}, { timestamps: true });

// prevent duplicate entries for the same user+movie
watchlistItemSchema.index({ user: 1, movieId: 1 }, { unique: true });

export default mongoose.model('WatchlistItem', watchlistItemSchema)