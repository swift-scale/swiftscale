import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a service title'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['Training', 'E-Commerce', 'IT Services', 'Consulting'],
    default: 'IT Services'
  },
  status: {
    type: String,
    enum: ['Active', 'Draft', 'Archived'],
    default: 'Active'
  },
  visibility: {
    type: String,
    enum: ['Website & Menu', 'Internal Only', 'Hidden'],
    default: 'Website & Menu'
  },
  description: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true
});

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

export default Service;
