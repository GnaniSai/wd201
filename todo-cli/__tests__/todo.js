/* eslint-disable no-undef */
const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Todolist Test Suite", () => {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
    .toISOString()
    .slice(0, 10);
  const tommorrow = new Date(new Date().setDate(new Date().getDate() + 1))
    .toISOString()
    .slice(0, 10);
  beforeAll(() => {
    add({
      title: "Test todo1",
      completed: false,
      dueDate: tommorrow,
    });
    add({
      title: "Test todo2",
      completed: false,
      dueDate: yesterday,
    });
  });
  test("Should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "Test todo3",
      completed: false,
      dueDate: today,
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Should retrieve overdue items", () => {
    const data = overdue();
    expect(data.length).toBe(1);
    expect(data[0].title).toBe("Test todo2");
  });

  test("Should retrieve due today items", () => {
    const data = dueToday();
    expect(data.length).toBe(1);
    expect(data[0].title).toBe("Test todo3");
  });

  test("Should retrieve due later items", () => {
    const data = dueLater();
    expect(data.length).toBe(1);
    expect(data[0].title).toBe("Test todo1");
  });
});
