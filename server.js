const path = require('path');
const express = require('express'); // express.js npm
const session = require('express-session'); // express-session npm
const exphbs = require('express-handlebars'); // express-handlebars npm
const routes = require('./controllers'); // main routes 
const helpers = require('./utils/helpers'); // helper functions folder
require('dotenv').config();

const sequelize = require('./config/connection'); // sequelize connection info?
const SequelizeStore = require('connect-session-sequelize')(session.Store); //sequelize session storage npm

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({ helpers });
//session enviroment settings?
const sess = {
  secret: process.env.SECRET, // move to dotenv file
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));/**Tells express.js to use a session enviroment? */


app.engine('handlebars', hbs.engine); /**Tells Express.js which template engine to use for rendering? */
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening @ http://localhost:3001'));
});

/*********************************************/
/****************Delete***********************/
/*********************************************/