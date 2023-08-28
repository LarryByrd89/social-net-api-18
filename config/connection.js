const mongoose = require('mongoose');


const DB_NAME = 'social-net-api-18';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-net-api-18', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

// Connection events
db.on('connected', () => {
  console.log(`Connected to MongoDB database: ${DB_NAME}`);
});

db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

process.on('SIGINT', async () => {
  await db.close();
  console.log('MongoDB connection closed due to app termination');
  process.exit(0);
});

module.exports = db;
