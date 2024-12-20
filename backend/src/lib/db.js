import mongoose from 'mongoose';

export const connectDB = async (URI) => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`connected to mongodb: ${conn.connection.host}`);
  } catch (error) {
    console.log('Error connecting to database', error);
    process.exit(1);
  }
};
