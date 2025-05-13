import mongoose, { Schema, Document } from 'mongoose';

export interface IProgram extends Document {
  title: {
    en: string;
    ne: string;
  };
  description: {
    en: string;
    ne: string;
  };
  status: 'ongoing' | 'completed';
  coverImage: string;
  images: string[];
  startDate: Date;
  endDate: Date;
  volunteers: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const programSchema = new Schema<IProgram>(
  {
    title: {
      en: { type: String, required: true },
      ne: { type: String, required: true },
    },
    description: {
      en: { type: String, required: true },
      ne: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ['ongoing', 'completed'],
      default: 'ongoing',
    },
    coverImage: {
      type: String,
      required: true,
    },
    images: [{
      type: String,
    }],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    volunteers: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Program || mongoose.model<IProgram>('Program', programSchema); 