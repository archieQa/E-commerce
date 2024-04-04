import mongoose from 'mongoose';

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    console.log('Database connection already established.');
    return;
  }

  require('dotenv').config();
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  // Use the non-null assertion operator (!) to tell TypeScript MONGODB_URI is not null or undefined.
  return mongoose.connect(MONGODB_URI!).then(() => {
    console.log('Successfully connected to the database');
  }).catch(err => {
    console.error('Error connecting to the database:', err.message);
    throw err;
  });
}

export default dbConnect;
