import Venue from '../models/venueModel.js';

export const getAllVenues = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 10;
        const skip = (page - 1) * limit;
        const keyword = req.query.keyword;
        const category = req.query.category;
        const search_city = req.query.search_city;

        // Build query object
        let query = {};
        if (keyword) {
            query = {
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { address: { $regex: keyword, $options: 'i' } },
                    { search_city: { $regex: keyword, $options: 'i' } }
                ]
            };
        }

        // Check if category is provided and add to query
        if (category) {
            query.category = category;
        }

        // Check if search_city is provided and add to query
        if (search_city) {
            query.search_city = search_city;
        }

        console.log('Search query:', { keyword, category, search_city, query });

        const venues = await Venue.find(query)
            .select('name address phone website email category image_url rating reviews original_url search_city hours')
            .sort({ rating: -1, reviews: -1 })
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
        // Validate required fields
        const requiredFields = ['name', 'address', 'phone', 'website', 'email', 'category', 'image_url', 'search_city'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({ 
                message: `Missing required fields: ${missingFields.join(', ')}` 
            });
        }

        // Create venue with all fields
        const venueData = {
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            website: req.body.website,
            email: req.body.email,
            category: req.body.category,
            image_url: req.body.image_url,
            rating: req.body.rating || 0,
            reviews: req.body.reviews || 0,
            original_url: req.body.original_url,
            search_city: req.body.search_city,
            hours: req.body.hours || 'Not specified'
        };

        const venue = await Venue.create(venueData);
        res.status(201).json(venue);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateVenue = async (req, res) => {
    try {
        // Ensure rating and reviews are numbers
        if (req.body.rating) req.body.rating = parseFloat(req.body.rating);
        if (req.body.reviews) req.body.reviews = parseInt(req.body.reviews);

        const venue = await Venue.findByIdAndUpdate(
            req.params.id, 
            req.body,
            { new: true, runValidators: true }
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

export const getTopRatedVenues = async (req, res) => {
    try {
        console.log('Fetching top rated venues with params:', req.query);
        
        const category = req.query.category;
        const search_city = req.query.search_city;

        // Build query object
        let query = {};
        
        // Add category filter if provided
        if (category) {
            query.category = category;
            console.log('Filtering by category:', category);
        }
        
        // Add city filter if provided
        if (search_city) {
            query.search_city = search_city.toLowerCase();
            console.log('Filtering by city:', search_city);
        }

        console.log('Final query:', query);

        const venues = await Venue.find(query)
            .select('name address rating reviews image_url category')
            .sort({ rating: -1, reviews: -1 })
            .limit(10);

        console.log(`Found ${venues.length} venues`);

        // Format the response for the slider
        const formattedVenues = venues.map(venue => ({
            url: `images/${venue.image_url}`,
            alt: venue.name,
            title: venue.name,
            subtitle: `${venue.category} • ${venue.rating}★ (${venue.reviews} reviews)`
        }));

        console.log('Sending formatted response');
        res.status(200).json(formattedVenues);
    } catch (error) {
        console.error('Error in getTopRatedVenues:', error);
        res.status(500).json({ 
            message: 'Error fetching top rated venues'
        });
    }
}; 