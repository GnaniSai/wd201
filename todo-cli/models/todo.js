// models/todo.js
"use strict";
const { Model, Op } = require("sequelize");
const getJSDate = (days) => {
  if (!Number.isInteger(days)) {
    throw new Error("Need to pass an integer as days");
  }
  const today = new Date();
  const oneDay = 60 * 60 * 24 * 1000;
  return new Date(today.getTime() + days * oneDay);
};
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      const overDueList = await Todo.overdue();
      const result1 = overDueList
        .map((value) => value.displayableString())
        .join("\n")
        .trim();
      console.log(result1);
      console.log("\n");

      console.log("Due Today");
      const dueTodayList = await Todo.dueToday();
      const result2 = dueTodayList
        .map((value) => value.displayableString())
        .join("\n")
        .trim();
      console.log(result2);
      console.log("\n");

      console.log("Due Later");
      const dueLaterList = await Todo.dueLater();
      const result3 = dueLaterList
        .map((value) => value.displayableString())
        .join("\n")
        .trim();
      console.log(result3);
    }

    static async overdue() {
      const tasks = await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: getJSDate(0),
          },
        },
      });
      return tasks.filter((value) => value);
    }

    static async dueToday() {
      const tasks = await Todo.findAll({
        where: {
          dueDate: {
            [Op.eq]: getJSDate(0),
          },
        },
      });
      return tasks.filter((value) => value);
    }

    static async dueLater() {
      const tasks = await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: getJSDate(0),
          },
        },
      });
      return tasks.filter((value) => value);
    }

    static async markAsComplete(id) {
      await Todo.update(
        { completed: true },
        {
          where: {
            id: id,
          },
        },
      );
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      const dueDates =
        this.dueDate === new Date().toISOString().slice(0, 10)
          ? ""
          : `${this.dueDate}`;
      return `${this.id}. ${checkbox} ${this.title} ${dueDates}`.trim();
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    },
  );
  return Todo;
};
