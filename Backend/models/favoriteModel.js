import mongoose from "mongoose";

const favoriteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue',
        required: true
    }
}, { timestamps: true });

// Compound index to prevent duplicate favorites
favoriteSchema.index({ user: 1, vendor: 1 }, { unique: true });

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite; 