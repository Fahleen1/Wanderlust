import mongoose from 'mongoose';

export const connectToDB = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`,
    );
    console.log('DB connection successful');
  } catch (error) {
    console.error('Mongodb connection error:', error);
    process.exit(1);
  }
};
