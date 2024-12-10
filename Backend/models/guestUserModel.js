import mongoose from 'mongoose';

const guestUserSchema = new mongoose.Schema({
  guestId: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 604800 
  }
});

export default mongoose.model('GuestUser', guestUserSchema); 