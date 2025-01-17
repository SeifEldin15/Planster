import Venue from '../models/venueModel.js';

// Get all venues with pagination and filtering
export const getAllVenues = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const keyword = req.query.keyword || '';
        const category = req.query.category;
        const services = req.query.services ? req.query.services.split(',') : [];

        // Build query
        let query = {};
        
        // Add keyword search
        if (keyword) {
            query.$or = [
                { name: { $regex: keyword, $options: 'i' } },
                { address: { $regex: keyword, $options: 'i' } }
            ];
        }

        // Add category filter
        if (category) {
            query.category = category;
        }

        // Add services filter
        if (services.length > 0) {
            query.services = { $in: services };
        }

        // Execute query with pagination
        const skip = (page - 1) * limit;
        
        const venues = await Venue.find(query)
            .select('name address rating reviews image_url category phone website email hours original_url _id')
            .skip(skip)
            .limit(limit)
            .sort({ rating: -1 });

        // Get total count for pagination
        const total = await Venue.countDocuments(query);
        
        res.status(200).json({
            venues,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            hasMore: skip + venues.length < total
        });

    } catch (error) {
        console.error('Error in getAllVenues:', error);
        res.status(500).json({ message: 'Error fetching venues' });
    }
};

// Get single venue by ID
export const getVenueById = async (req, res) => {
    try {
        const venue = await Venue.findById(req.params.id);
        if (!venue) {
            return res.status(404).json({ message: 'Venue not found' });
        }
        res.status(200).json(venue);
    } catch (error) {
        console.error('Error in getVenueById:', error);
        res.status(500).json({ message: 'Error fetching venue' });
    }
};

// Get top rated venues
export const getTopRatedVenues = async (req, res) => {
    try {
        const { category, city } = req.query;
        
        let query = {};
        if (category) {
            query.category = category;
        }
        if (city) {
            query.search_city = city.toLowerCase();
        }

        const venues = await Venue.find(query)
            .select('name address rating reviews image_url category phone website email hours original_url _id')
            .sort({ rating: -1, reviews: -1 })
            .limit(10);

        const formattedVenues = venues.map(venue => ({
            id: venue._id,
            url: venue.image_url,
            alt: venue.name,
            title: venue.name,
            subtitle: `${venue.category} • ${venue.rating}★ (${venue.reviews} reviews)`,
            address: venue.address,
            phone: venue.phone,
            website: venue.website,
            email: venue.email,
            hours: venue.hours,
            fullDetails: {
                address: venue.address,
                phone: venue.phone,
                website: venue.website || '',
                email: venue.email,
                hours: venue.hours || 'Hours not available',
                original_url: venue.original_url || '',
                rating: venue.rating,
                reviews: venue.reviews,
                category: venue.category
            }
        }));

        res.status(200).json(formattedVenues);
    } catch (error) {
        console.error('Error in getTopRatedVenues:', error);
        res.status(500).json({ message: 'Error fetching top rated venues' });
    }
};

// Create new venue (if needed)
export const createVenue = async (req, res) => {
    try {
        const venue = new Venue(req.body);
        const savedVenue = await venue.save();
        res.status(201).json(savedVenue);
    } catch (error) {
        console.error('Error in createVenue:', error);
        res.status(500).json({ message: 'Error creating venue' });
    }
};

// Update venue (if needed)
export const updateVenue = async (req, res) => {
    try {
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
        console.error('Error in updateVenue:', error);
        res.status(500).json({ message: 'Error updating venue' });
    }
};

// Delete venue (if needed)
export const deleteVenue = async (req, res) => {
    try {
        const venue = await Venue.findByIdAndDelete(req.params.id);
        if (!venue) {
            return res.status(404).json({ message: 'Venue not found' });
        }
        res.status(200).json({ message: 'Venue deleted successfully' });
    } catch (error) {
        console.error('Error in deleteVenue:', error);
        res.status(500).json({ message: 'Error deleting venue' });
    }
}; 