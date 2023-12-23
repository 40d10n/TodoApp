const { Router } = require("express");
const { TodosService } = require("../todos/todos.service");

const router = Router();
const todosService = new TodosService();


router.get('/', async (req, res, next) => {

  const listSrc = await todosService.getList();

  const list = listSrc.map((el) => {
    return {
      name: el.name,
      id: el.id.toString(),
      completed: el.completed,
      createdAt: new Date(el.createdAt).toLocaleString('ru-RU'),
      completedClass: el.completed ? 'todos__item_complited' : '',
    };
  });

  res.render('index', {
    title: 'Список справ',
    description: 'Приложение - список справ',
    h1: 'Список справ',
    text: 'Привіт! Запиши справу <br>щоб нічого не забути!',
    list,
  });
});


router.get('/new', async (req, res, next) => {
  res.render('new', {
    title: 'Створи нову справу',
    description: 'Створи нову справу в приложении Список дел',
    h1: 'Створи нову справу',
    text: 'Привіт! Запиши справу <br>щоб нічого не забути!',
  });

});


router.post('/add', async (req, res, next) => {
  if(!req.body)   res.redirect('/');


  const { text } = req.body;
  const newTask = await todosService.addTask(text);  
  res.redirect('/');

});

router.post('/complete', async (req, res, next) => {

  const { id } = req.body;

  await todosService.toggleComplete(id);

  res.redirect('/');

});

router.post('/delete', async (req, res, next) => {
  const { id } = req.body;

  const newTask = await todosService.delete(id);
  res.redirect('/');

});



module.exports = router;
