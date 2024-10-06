"use strict";
const { Model, Op, where } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static getTodos() {
      return this.findAll({
        where: {
          completed: true,
        },
      });
    }
    static async addTodo({ title, dueDate }) {
      return this.create({ title: title, dueDate: dueDate, completed: false });
    }
    static async overDue() {
      return this.findAll({
        where: {
          completed: false,
          dueDate: {
            [Op.lt]: new Date().toISOString().slice(0, 10),
          },
        },
      });
    }

    static async dueToday() {
      return this.findAll({
        where: {
          completed: false,
          dueDate: {
            [Op.eq]: new Date().toISOString().slice(0, 10),
          },
        },
      });
    }

    static async dueLater() {
      return this.findAll({
        where: {
          completed: false,
          dueDate: {
            [Op.gt]: new Date().toISOString().slice(0, 10),
          },
        },
      });
    }

    static async remove(id) {
      return this.destroy({
        where: {
          id,
        },
      });
    }

    setCompletionStatus() {
      return this.update({ completed: !this.completed });
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
