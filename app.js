const express = require('express');
const {
  PORT, DB_NAME,
} = require('./constants/constants');
const router = require('./routes/router');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');



const app = express();

app.use(express.static(
  path.join(__dirname, 'public')
));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// handlebars
app.engine('hbs', engine({
  defaultLayout: 'main',
  extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './views');


app.use(router);

async function init() {

  try {
    await mongoose.connect(`mongodb://0.0.0.0:27017/${DB_NAME}`);
    console.log(`[mongo] Connected to database success: ${DB_NAME}`);
  } catch (e) {
    console.log('[error] Cannot connect to database', e);
  }

  const server = app.listen(PORT, () => {
    console.log(`[express] Server started at http://localhost:${PORT}/`);
  });

}

init();