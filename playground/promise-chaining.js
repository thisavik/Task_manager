// Illustrate use of chaining using mongoose

require('../src/db/mongoose')
const User = require('../src/models/user')

// 5ed7aa95ffe6bf73bc8c3c8c

// User.findByIdAndUpdate('5ed7aa95ffe6bf73bc8c3c8c', { age: 1 }).then((user) => {
//   console.log(user)
//   return User.countDocuments({ age: 1 })
// }).then((result) => {
//   console.log(result)
// }).catch((error) => {
//   console.log(error)
// })


const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age })
  const count = await User.countDocuments({ age })
  return {
    user: user,
    count: count,
  }
}

updateAgeAndCount('5ed7aa95ffe6bf73bc8c3c8c', 1).then(({user, count}) => {
  console.log(user)
  console.log(count)
}).catch((error) => {
  console.log(error)
})