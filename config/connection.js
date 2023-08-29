const { connect, connection } = require('mongoose');

const DB_NAME = 'social-net-api-18';

connect(process.env.MONGODB_URI || `mongodb://localhost:27017/${DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

connection.on('connected', () => {
  console.log(`Connected to MongoDB database: ${DB_NAME}`);
});

connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

process.on('SIGINT', async () => {
  await connection.close();
  console.log('MongoDB connection closed due to app termination');
  process.exit(0);
});

module.exports = connection;

