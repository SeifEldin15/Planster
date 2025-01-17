import mongoose from "mongoose";

const venueSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    images: {
        type: [String], 
        default: []
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    reviews: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        default: 'Wedding venue'
    },
    hours: {
        type: String
    },
    website: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    original_url: {
        type: String
    },
    search_city: {
        type: String,
        required: true
    }
}, {
    timestamps: true 
});

const Venue = mongoose.model('Venue', venueSchema);

export default Venue; 