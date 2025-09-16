// scripts/updateAdminRole.js
import mongoose from 'mongoose';
import User from '../models/User.js';

mongoose.connect('mongodb://localhost:27017/myDB');

async function makeAdmin() {
  const user = await User.findOne({ email: 'admin@medikart.com' });
  if (user) {
    user.role = 'admin';
    await user.save();
    console.log('✅ Admin role updated!');
  } else {
    console.log('❌ Admin user not found');
  }
  mongoose.disconnect();
}

makeAdmin();
