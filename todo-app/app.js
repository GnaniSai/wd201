const express = require("express");
var csrf = require("csurf");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const path = require("path");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("shh! some secret string"));
app.use(csrf({ cookie: true }));

app.set("view engine", "ejs");

app.get("/", async function (request, response) {
  const allTodos = await Todo.getTodos();
  const overdue = await Todo.overDue();
  const dueToday = await Todo.dueToday();
  const dueLater = await Todo.dueLater();

  if (request.accepts("html")) {
    response.render("index", {
      allTodos,
      overdue,
      dueToday,
      dueLater,
      csrfToken: request.csrfToken(),
    });
  } else {
    response.json({
      allTodos,
      overdue,
      dueToday,
      dueLater,
    });
  }
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/todos", async function (_request, response) {
  console.log("Processing list of all Todos ...");
  try {
    const todos = await Todo.findAll();
    response.send(todos);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async function (request, response) {
  try {
    await Todo.addTodo(request.body);
    return response.redirect("/");
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    const { completed } = request.body;
    await todo.setCompletionStatus(completed);
    response.json({ completed: true });
  } catch (error) {
    console.error(error);
    response.json({
      error,
    });
  }
});

app.delete("/todos/:id", async function (request, response) {
  console.log("We have to delete a Todo with ID: ", request.params.id);
  try {
    await Todo.remove(request.params.id);
    return response.json({ success: true });
  } catch (error) {
    return response.status(422).json(error);
  }
});

module.exports = app;
