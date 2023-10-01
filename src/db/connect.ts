import mongoose from 'mongoose';

export const connectDB = async (URL: string) => {
    return mongoose.connect(URL);
}