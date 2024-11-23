import Favorite from '../models/favoriteModel.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export const toggleFavorite = async (req, res) => {
    try {
        const { vendorId } = req.body;
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        
        console.log('Received token in favorites controller:', token);

        if (!token) {
            return res.status(401).json({ 
                message: 'Unauthorized - Please login',
                details: 'No authentication token found'
            });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
            console.log('Decoded token:', decoded);
            
            if (!decoded.id || (!decoded.isGuest && !decoded.email)) {
                throw new Error('Invalid token structure');
            }
        } catch (jwtError) {
            console.error('JWT Verification failed:', jwtError.message);
            return res.status(401).json({ 
                message: 'Unauthorized - Invalid token',
                details: 'Your session may have expired. Please login again.'
            });
        }

        // Verify token and get user ID
        let userId;
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            userId = decoded.id;
            
            // If it's a guest user, use guestId instead
            if (decoded.isGuest) {
                userId = decoded.id; // This will be the guest user's _id
            }
        } catch (jwtError) {
            console.error('JWT Verification failed:', jwtError.message);
            return res.status(401).json({ 
                message: 'Unauthorized - Invalid token',
                details: 'Your session may have expired. Please login again.'
            });
        }

        // Check if favorite already exists
        const existingFavorite = await Favorite.findOne({
            user: userId,
            vendor: vendorId
        });

        if (existingFavorite) {
            // If exists, remove it
            await Favorite.findByIdAndDelete(existingFavorite._id);
            return res.status(200).json({ 
                message: 'Removed from favorites',
                isFavorite: false
            });
        }

        // If doesn't exist, create new favorite
        const newFavorite = new Favorite({
            user: userId,
            vendor: vendorId
        });

        await newFavorite.save();
        res.status(201).json({ 
            message: 'Added to favorites',
            isFavorite: true
        });

    } catch (error) {
        console.error('Favorite toggle error:', {
            error: error.message,
            stack: error.stack,
            body: req.body
        });
        
        res.status(500).json({ 
            message: 'Error toggling favorite',
            details: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred'
        });
    }
};

export const getFavorites = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ 
                message: 'Unauthorized - Please login',
                details: 'No authentication token found'
            });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
            if (!decoded.id) {
                throw new Error('Invalid token structure');
            }
        } catch (jwtError) {
            console.error('JWT Verification failed:', jwtError.message);
            return res.status(401).json({ 
                message: 'Unauthorized - Invalid token',
                details: 'Your session may have expired. Please login again.'
            });
        }

        const favorites = await Favorite.find({ user: decoded.id })
            .populate('vendor')  // This populates the full venue data
            .sort('-createdAt');  // Sort by newest first

        res.status(200).json(favorites);

    } catch (error) {
        console.error('Get favorites error:', error);
        res.status(500).json({ 
            message: 'Error getting favorites',
            details: error.message
        });
    }
};
