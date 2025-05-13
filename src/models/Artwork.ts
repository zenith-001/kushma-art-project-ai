import mongoose from 'mongoose';

const artworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['painting', 'sculpture', 'digital', 'photography', 'other']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price']
  },
  dimensions: {
    width: Number,
    height: Number,
    depth: Number
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Artwork || mongoose.model('Artwork', artworkSchema); 