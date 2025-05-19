import mongoose, { Schema, Document } from 'mongoose';

export interface ISubcontractor extends Document {
  businessName: string;
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhone?: string;
  insuranceContactName?: string;
  insuranceContactEmail?: string;
  insuranceContactPhone?: string;
  insuranceAgencyName?: string;
  uploads: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const SubcontractorSchema: Schema = new Schema(
  {
    businessName: {
      type: String,
      required: [true, 'Business name is required']
    },
    contactFirstName: {
      type: String,
      required: [true, 'First name is required']
    },
    contactLastName: {
      type: String,
      required: [true, 'Last name is required']
    },
    contactEmail: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    contactPhone: {
      type: String,
      trim: true
    },
    insuranceContactName: {
      type: String,
      trim: true
    },
    insuranceContactEmail: {
      type: String,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    insuranceContactPhone: {
      type: String,
      trim: true
    },
    insuranceAgencyName: {
      type: String,
      trim: true
    },
    uploads: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Upload'
    }]
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ISubcontractor>('Subcontractor', SubcontractorSchema); 