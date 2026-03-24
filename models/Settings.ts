import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    default: 'Swiftscale'
  },
  tagline: {
    type: String,
    default: 'Smart Solutions, Swift Scale'
  },
  logo: {
    url: String,
    publicId: String
  },
  contact: {
    email: { type: String, default: 'contact@swiftscale.com' },
    phone: { type: String, default: '+1 (555) 000-0000' },
    address: { type: String, default: '123 Innovation Drive, Tech City, TC 10101' }
  },
  socials: {
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' },
    facebook: { type: String, default: '' },
    github: { type: String, default: '' }
  },
  about: {
    description: { type: String, default: '' },
    vision: { type: String, default: '' },
    mission: { type: String, default: '' }
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// We only want ONE settings document for the entire app.
const Settings = mongoose.models.Settings || mongoose.model('Settings', settingsSchema);

export default Settings;
