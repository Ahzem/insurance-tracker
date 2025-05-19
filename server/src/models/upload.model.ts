import mongoose, { Schema, Document } from 'mongoose';

export interface IUpload extends Document {
  originalName: string;
  storedName: string;
  url: string;
  mimeType: string;
  size?: number;
  uploadDate: Date;
  uploadedBy: mongoose.Types.ObjectId;
  description: string;
  isDeleted: boolean;
}

const UploadSchema: Schema = new Schema(
  {
    originalName: {
      type: String,
      required: [true, 'Original file name is required']
    },
    storedName: {
      type: String,
      required: [true, 'Stored file name is required']
    },
    url: {
      type: String,
      default: ''
    },
    mimeType: {
      type: String,
      required: [true, 'MIME type is required']
    },
    size: {
      type: Number
    },
    uploadDate: {
      type: Date,
      default: Date.now
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required']
    },
    description: {
      type: String,
      default: ''
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IUpload>('Upload', UploadSchema); 