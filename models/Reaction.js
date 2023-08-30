const moment = require('moment');
const { Schema, model } = require('mongoose');

// Define the date format function using Moment
const dateFormat = timestamp => {
  return moment(timestamp).format('MMMM Do, YYYY [at] h:mm A');
};

const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);



module.exports = reactionSchema;
