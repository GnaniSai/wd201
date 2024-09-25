const todoList = () => {
  all = []
  const add = (todoItem) => {
    all.push(todoItem)
  }
  const markAsComplete = (index) => {
    all[index].completed = true
  }

  const overdue = () => {
    let a = [];
    for (i = 0; i < all.length; i++) {
      if (all[i].dueDate === yesterday) {
        a.push(all[i])
      }
    }
    return a
  }

  const dueToday = () => {
    let b = [];
    for (i = 0; i < all.length; i++) {
      if (all[i].dueDate === today) {
        b.push(all[i])
      }
    }
    return b
  }

  const dueLater = () => {
    let c = [];
    for (i = 0; i < all.length; i++) {
      if (all[i].dueDate === tomorrow) {
        c.push(all[i])
      }
    }
    return c
  }

  const toDisplayableList = (list) => {
    let data = [];
    for(j = 0; j < list.length; j++) {
      const element = list[j]
      
      if (element.completed && element.dueDate == today) {
        data.push(`[x] ${element.title}`)
      }
      else if (element.completed) {
        data.push(`[x] ${element.title} ${element.dueDate}`)
      }
      else if(element.completed != true && element.dueDate ==today){
        data.push(`[ ] ${element.title}`)
      }
      else {
        data.push(`[ ] ${element.title} ${element.dueDate}`)
      }
    }
    return data.join("\n")
  }

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList
  };
};

const todos = todoList();

const formattedDate = d => {
  return d.toISOString().split("T")[0]
}

var dateToday = new Date()
const today = formattedDate(dateToday)
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
)
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
)

todos.add({ title: 'Submit assignment', dueDate: yesterday, completed: false })
todos.add({ title: 'Pay rent', dueDate: today, completed: true })
todos.add({ title: 'Service Vehicle', dueDate: today, completed: false })
todos.add({ title: 'File taxes', dueDate: tomorrow, completed: false })
todos.add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false })

console.log("My Todo-list\n")

console.log("Overdue")
var overdues = todos.overdue()
var formattedOverdues = todos.toDisplayableList(overdues)
console.log(formattedOverdues)
console.log("\n")

console.log("Due Today")
let itemsDueToday = todos.dueToday()
let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday)
console.log(formattedItemsDueToday)
console.log("\n")

console.log("Due Later")
let itemsDueLater = todos.dueLater()
let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater)
console.log(formattedItemsDueLater)
console.log("\n\n")