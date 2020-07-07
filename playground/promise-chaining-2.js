require('../src/db/mongoose')

const Task = require('../src/models/task')

// 5eca6b0b8cdde13788850a15

// Task.findByIdAndDelete('5eca6b0b8cdde13788850a15').then((task) => {
//   console.log(task)
//   return Task.countDocuments({ completed: false })
// }).then((result) => {
//   console.log(result)
// }).catch((error) => {
//   console.log(error)
// })

const deleteTaskAndCount = async (id, completed) => {
  const task = await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({completed})
  return {
    task: task,
    count: count
  }
}

deleteTaskAndCount('5ed7adff58b3b66b68d835e8', false).then(({task, count}) => {
  console.log(task)
  console.log(count)
}).catch((error) => {
  console.log(error)
})