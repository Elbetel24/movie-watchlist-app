import WatchlistItem from '../models/watchlistItem.model.js';

export const addOrUpdateItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { movieId, title, posterPath, status } = req.body;

    if (!movieId || !status) {
      return res.status(400).json({ error: 'movieId and status are required' });
    }

    const item = await WatchlistItem.findOneAndUpdate(
      { user: userId, movieId },
      { title, posterPath, status },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json(item);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: 'Failed to save watchlist item.' });
  }
};

// Get the logged-in user's list, optionally filtered by status
export const getUserList = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status } = req.query; // 'watchlist' | 'watched' | undefined

    const filter = { user: userId };
    if (status) filter.status = status;

    const items = await WatchlistItem.find(filter).sort({ createdAt: -1 });
    return res.json(items);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: 'Failed to fetch list.' });
  }
};

export const removeItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { movieId } = req.params;

    await WatchlistItem.findOneAndDelete({ user: userId, movieId });
    return res.status(204).send();
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: 'Failed to remove item.' });
  }
};
