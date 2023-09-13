const express = require("express");
const app = express();

const { NotFoundError, BadRequestError } = require("./expressError");

const itemRoutes = require("./itemRoutes");



app.use(express.json());
app.use("/items", itemRoutes);

module.exports = app;
