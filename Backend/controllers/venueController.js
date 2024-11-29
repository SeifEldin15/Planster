import Venue from '../models/venueModel.js';

export const getAllVenues = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        console.log('Fetching venues with limit:', limit);
        const venues = await Venue.find({}).limit(limit);
        res.status(200).json(venues);
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