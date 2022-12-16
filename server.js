const express = require("express");
// import sequelize connection
const sequelize = require("./config/connection");
const model = require("./models");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`http://localhost:${PORT}!`));
});