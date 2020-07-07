const mongoose = require('mongoose')

// connection to the database
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  console.log('Connected Successfully !!')
}).catch((error) => {
  console.log(error)
})