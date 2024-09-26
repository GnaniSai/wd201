/* eslint-disable no-undef */
const todoList = () => {
  all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    return all.filter(
      (value) => value["dueDate"] < new Date().toISOString().slice(0, 10)
    );
  };

  const dueToday = () => {
    return all.filter(
      (value) => value["dueDate"] === new Date().toISOString().slice(0, 10)
    );
  };

  const dueLater = () => {
    return all.filter(
      (value) => value["dueDate"] > new Date().toISOString().slice(0, 10)
    );
  };

  const toDisplayableList = (list) => {
    return list
      .map((element) => {
        const status = element.completed ? "[x]" : "[ ]";
        const dueDate =
          element.dueDate === new Date().toISOString().slice(0, 10)
            ? ""
            : ` ${element.dueDate}`;
        return `${status} ${element.title}${dueDate}`.trim();
      })
      .join("\n");
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

module.exports = todoList;
