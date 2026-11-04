const Favourite = require('../models/Favourite');

exports.toggleFavourite = async (req, res) => {
  try {
    const { buyerName, propertyId } = req.body;

    // Already favourite panni irukka nu check pandrom
    const existingFav = await Favourite.findOne({ buyerName, propertyId });

    if (existingFav) {
      // Irundha remove pandrom (Toggle)
      await Favourite.findByIdAndDelete(existingFav._id);
      return res.status(200).json({ message: 'Removed from favourites', isFavourite: false });
    } else {
      // Illaina add pandrom
      const newFav = new Favourite({ buyerName, propertyId });
      await newFav.save();
      return res.status(201).json({ message: 'Added to favourites', isFavourite: true });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};

exports.getMyFavourites = async (req, res) => {
  try {
    const { buyerName } = req.query;
    const favourites = await Favourite.find({ buyerName }).populate('propertyId');
    res.status(200).json(favourites);
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
};