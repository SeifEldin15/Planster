import Venue from '../models/venueModel.js';

export const getAllVenues = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 10;
        const skip = (page - 1) * limit;
        const keyword = req.query.keyword;
        const category = req.query.category;

        // Build query object
        let query = {};
        if (keyword) {
            query = {
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },     // Case-insensitive name search
                    { address: { $regex: keyword, $options: 'i' } }    // Case-insensitive address search
                ]
            };
        }

        // Check if category is provided and add to query
        if (category) {
            query.category = category; // Add category filter
        }

        console.log('Search query:', { keyword, category, query });

        const venues = await Venue.find(query)
            .sort({ _id: 1 })
            .skip(skip)
            .limit(limit);

        // Get total count for pagination
        const total = await Venue.countDocuments(query);
        const hasMore = total > skip + venues.length;

        console.log('Query results:', { 
            total,
            returned: venues.length, 
            hasMore 
        });

        res.status(200).json({
            venues,
            hasMore,
            total
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getVenueById = async (req, res) => {
    try {
        const venue = await Venue.findById(req.params.id);
        if (!venue) {
            return res.status(404).json({ message: 'Venue not found' });
        }
        res.status(200).json(venue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createVenue = async (req, res) => {
    try {
        if (req.body.images && !Array.isArray(req.body.images)) {
            req.body.images = [req.body.images];
        }
        const venue = await Venue.create(req.body);
        res.status(201).json(venue);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateVenue = async (req, res) => {
    try {
        if (req.body.images && !Array.isArray(req.body.images)) {
            req.body.images = [req.body.images];
        }
        const venue = await Venue.findByIdAndUpdate(
            req.params.id, 
            req.body,
            { new: true }
        );
        if (!venue) {
            return res.status(404).json({ message: 'Venue not found' });
        }
        res.status(200).json(venue);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteVenue = async (req, res) => {
    try {
        const venue = await Venue.findByIdAndDelete(req.params.id);
        if (!venue) {
            return res.status(404).json({ message: 'Venue not found' });
        }
        res.status(200).json({ message: 'Venue deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 