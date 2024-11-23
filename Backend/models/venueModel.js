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
        type: [String],  // Array of image names/paths
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
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

const Venue = mongoose.model('Venue', venueSchema);

export default Venue; 