import connectDB from './lib/db';
import User from './models/User';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure we load .env from the root
dotenv.config({ path: path.resolve(__dirname, '.env') });

async function seedAdmin() {
  try {
    console.log('Connecting to database...');
    await connectDB();

    const adminEmail = 'abhijith@swiftscaleinc.com';
    const adminPassword = '@Admin@123#';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('Admin user already exists. Updating password and role...');
      existingAdmin.password = adminPassword;
      existingAdmin.role = 'admin';
      existingAdmin.name = 'Admin Abhijith';
      await existingAdmin.save();
    } else {
      console.log('Creating new admin user...');
      await User.create({
        name: 'Admin Abhijith',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
        isVerified: true
      });
    }

    console.log('Admin user seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
}

seedAdmin();
