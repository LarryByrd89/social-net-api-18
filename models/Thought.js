const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function () {
      return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(this.createdAt);
    },
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [
    {
      reactionId: mongoose.Schema.Types.ObjectId,
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: function () {
          return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(this.createdAt);
        },
      },
    },
  ],
});

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;

