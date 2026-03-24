import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide a first name'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Please provide a last name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  service: {
    type: String,
    required: [true, 'Please specify the service required'],
  },
  details: {
    type: String,
    required: [true, 'Please provide project details'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'archived', 'deleted', 'draft'],
    default: 'new'
  },
  isUrgent: {
    type: Boolean,
    default: false
  },
  fromEmail: {
    type: String,
    trim: true
  },
  smtpMessageId: {
    type: String,
    trim: true
  },
  draft: {
    body: String,
    to: [String],
    cc: [String],
    bcc: [String],
    subject: String,
    senderAlias: String,
    attachments: [{
      url: String,
      publicId: String,
      filename: String,
      size: Number,
      resourceType: String
    }],
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  replies: [{
    body: String,
    senderAlias: String,
    fromEmail: String,
    smtpMessageId: String,
    sentAt: {
      type: Date,
      default: Date.now
    },
    cc: [String],
    bcc: [String],
    attachments: [{
      url: String,
      publicId: String,
      filename: String,
      size: Number,
      resourceType: String
    }]
  }],
  cc: [String],
  bcc: [String],
  attachments: [{
    url: String,
    publicId: String,
    filename: String,
    size: Number,
    resourceType: String
  }]
}, {
  timestamps: true
});

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

export default Message;
