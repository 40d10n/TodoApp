const { model } = require('mongoose');
const { TodosSchema } = require('./todos.schema');


const TodosModel = model('Todo', TodosSchema);

module.exports = {
  TodosModel,
}