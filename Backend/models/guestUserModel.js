import mongoose from 'mongoose';

const guestUserSchema = new mongoose.Schema({
  guestId: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('GuestUser', guestUserSchema); 