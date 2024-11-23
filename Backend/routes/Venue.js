import express from 'express';
import Venue from '../models/venueModel.js';

const router = express.Router();

// Create a new venue
router.post('/', async (req, res) => {
    try {
        // Ensure images is an array if provided
        if (req.body.images && !Array.isArray(req.body.images)) {
            req.body.images = [req.body.images];
        }
        const venue = await Venue.create(req.body);
        res.status(201).json(venue);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all venues
router.get('/', async (req, res) => {
    try {
        const venues = await Venue.find({});
        res.status(200).json(venues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single venue by ID
router.get('/:id', async (req, res) => {
    try {
        const venue = await Venue.findById(req.params.id);
        if (!venue) {
            return res.status(404).json({ message: 'Venue not found' });
        }
        res.status(200).json(venue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update venue
router.put('/:id', async (req, res) => {
    try {
        // Ensure images is an array if provided
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
});

// Delete venue
router.delete('/:id', async (req, res) => {
    try {
        const venue = await Venue.findByIdAndDelete(req.params.id);
        if (!venue) {
            return res.status(404).json({ message: 'Venue not found' });
        }
        res.status(200).json({ message: 'Venue deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;