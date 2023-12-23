const { TodosModel } = require("./todos.model");



class TodosService {

  todosModel;

  constructor() {
    this.todosModel = TodosModel;
    
  }

  getList() {
    return this.todosModel.find({}).sort({'createdAt': -1}).exec();
  }

  addTask(name) {
    return this.todosModel.create({ name });
  }

  delete(id) {
    return this.todosModel.findByIdAndDelete(id);
  }

  async toggleComplete(id) {

    const previous = await this.todosModel.findById(id);
    
    return this.todosModel.findByIdAndUpdate(id, {
      completed: !previous.completed,
    }).exec();

  }
}


module.exports = {
  TodosService,
}