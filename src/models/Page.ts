import mongoose, { Schema, Document } from 'mongoose';

export interface IPage extends Document {
  slug: string;
  title: {
    en: string;
    ne: string;
  };
  content: {
    en: string;
    ne: string;
  };
  sections: Array<{
    type: string;
    content: {
      en: any;
      ne: any;
    };
    order: number;
  }>;
  isPublished: boolean;
  updatedAt: Date;
}

const pageSchema = new Schema<IPage>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      en: { type: String, required: true },
      ne: { type: String, required: true },
    },
    content: {
      en: { type: String, required: true },
      ne: { type: String, required: true },
    },
    sections: [{
      type: {
        type: String,
        required: true,
      },
      content: {
        en: { type: Schema.Types.Mixed },
        ne: { type: Schema.Types.Mixed },
      },
      order: {
        type: Number,
        required: true,
      },
    }],
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Page || mongoose.model<IPage>('Page', pageSchema); 