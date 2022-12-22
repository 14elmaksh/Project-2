const express = require("express");
// import sequelize connection
const sequelize = require("./config/connection");
const routes = require('./controller');


// Dependencies
const path = require('path');
const exphbs = require('express-handlebars');
// package to search book by isbn
const isbn = require('node-isbn');

const app = express();
const PORT = process.env.PORT || 3001;

// Set Handlebars as the default template engine.
// app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
});