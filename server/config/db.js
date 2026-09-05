import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not set in .env');
  }

  mongoose.set('strictQuery', true);

  await mongoose.connect(uri);
  console.log(`[db] Connected to MongoDB: ${mongoose.connection.name}`);

  mongoose.connection.on('error', (err) => {
    console.error('[db] Connection error:', err.message);
  });
}
