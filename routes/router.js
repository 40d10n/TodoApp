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
        title: 'Список дел',
        description: 'Приложение - список дел',
        h1: 'Список дел',
        text: 'Привет! Давай составим список дел, <br>чтобы ничего не забыть!',
        list,
    });
});


router.get('/new', async (req, res, next) => {
    res.render('new', {
        title: 'Создать новое дело',
        description: 'Создать новое дело в приложении Список дел',
        h1: 'Создать новое дело',
        text: 'Привет! Давай создадим новое дело, <br>чтобы не забыть его!',
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