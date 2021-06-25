const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    // eslint-disable-next-line no-console
    console.log('Mongoose DB running');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.message);

    process.exit(1);
  }
};

module.exports = connectDB;
