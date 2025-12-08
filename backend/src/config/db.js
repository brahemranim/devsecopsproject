const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/todo_app';
  const maxRetries = 20;
  let attempt = 0;

  const connect = async () => {
    try {
      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('MongoDB connected successfully');
    } catch (err) {
      attempt++;
      console.warn(`MongoDB connection attempt ${attempt} failed. Retrying in 3s...`);
      if (attempt >= maxRetries) {
        console.error('Max retries reached. Exiting.');
        throw err;
      }
      await new Promise((res) => setTimeout(res, 3000));
      return connect();
    }
  };

  return connect();
};

module.exports = connectDB;
