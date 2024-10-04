const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.json());

app.set("view engine", "ejs");

app.get("/", async function (request, response) {
  const allTodos = await Todo.getTodos();
  const overDueList = await Todo.overDue();
  const dueTodayList = await Todo.dueToday();
  const dueLaterList = await Todo.dueLater();

  if (request.accepts("html")) {
    response.render("index", {
      allTodos,
      overDueList,
      dueTodayList,
      dueLaterList,
    });
  } else {
    response.json({
      allTodos,
      overDueList,
      dueTodayList,
      dueLaterList,
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

app.get("/todos-overdue", async function (request, response) {
  try {
    const overDueTodos = await Todo.overDue();
    return response.json(overDueTodos);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.get("/todos-duetoday", async function (request, response) {
  try {
    const dueTodayTodos = await Todo.dueToday();
    return response.json(dueTodayTodos);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.get("/todos-duelater", async function (request, response) {
  try {
    const dueLaterTodos = await Todo.dueLater();
    return response.json(dueLaterTodos);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async function (request, response) {
  try {
    const todo = await Todo.addTodo(request.body);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id/markAsCompleted", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.markAsCompleted();
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async function (request, response) {
  console.log("We have to delete a Todo with ID: ", request.params.id);
  try {
    const todo = await Todo.findByPk(request.params.id);
    const deletedTodo = await todo.destroy();
    return response.send(deletedTodo ? true : false);
  } catch (error) {
    console.log(error);
    return response.status(422).send(false);
  }
});

module.exports = app;
