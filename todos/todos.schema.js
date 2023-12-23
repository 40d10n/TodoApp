const { Schema } = require('mongoose');

const TodosSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt : {
    type: Date,
    default: Date.now,
  }
});

module.exports = {
  TodosSchema,
}