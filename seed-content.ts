import connectDB from './lib/db';
import Service from './models/Service';
import Message from './models/Message';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const INITIAL_SERVICES = [
  { title: "BI Master Program", category: "Training", status: "Active", visibility: "Website & Menu" },
  { title: "Full Stack Master", category: "Training", status: "Active", visibility: "Website & Menu" },
  { title: "Logistics", category: "E-Commerce", status: "Active", visibility: "Website & Menu" },
  { title: "App/Web Dev", category: "IT Services", status: "Active", visibility: "Website & Menu" },
  { title: "Cybersecurity", category: "IT Services", status: "Active", visibility: "Website & Menu" },
];

const INITIAL_MESSAGES = [
  { 
    firstName: "Alice", 
    lastName: "Williams", 
    email: "alice@example.com", 
    service: "scaling", 
    details: "I'm looking to scale my retail business globally. Can we schedule a call?",
    status: "new"
  },
  { 
    firstName: "Bob", 
    lastName: "Johnson", 
    email: "bob@tech.io", 
    service: "infra", 
    details: "Need a complete infrastructure audit for our cloud migration.",
    status: "read"
  }
];

async function seedContent() {
  try {
    console.log('Connecting to database...');
    await connectDB();

    // Seed Services
    console.log('Seeding Services...');
    await Service.deleteMany({}); // Optional: clear existing
    await Service.insertMany(INITIAL_SERVICES);

    // Seed Messages
    console.log('Seeding Messages...');
    await Message.deleteMany({}); // Optional: clear existing
    await Message.insertMany(INITIAL_MESSAGES);

    console.log('Content seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding content:', error);
    process.exit(1);
  }
}

seedContent();
