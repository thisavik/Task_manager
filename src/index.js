const express = require("express")

// ensures to run mongoose.js file to connect with the database
require("./db/mongoose.js")
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000


// this parse incoming json to object
app.use(express.json())

// Routers used from different file
app.use(userRouter)
app.use(taskRouter)

// start the server
app.listen(port, () => {
  console.log("Server is up on port" + port)
})

// const Task = require('../src/models/task')
// const User = require('./models/user')

// const main = async () => {
//   // const task = await Task.findById('5ede54bd8510b28814471f85')

//   // // as this below line execute the _id saved in owner populate the document and save  that into own property 
//   // await task.populate('owner').execPopulate() 
//   // console.log(task.owner)

//   const user = await User.findById('5ede5156460efd316ccb3a17')
//   await user.populate('tasks').execPopulate()
//   console.log(user.tasks)
// }
// main()

// upload files using multer
// const multer = require('multer')
// const upload = multer({
//   dest: 'images',
//   limits: {
//     fileSize: 1000000
//   },
//   fileFilter(req, file, callback) {

//     // using regular expression
//     if(!file.originalname.match(/\.(doc|docx)$/)) {
//       callback(new Error('Please upload DOC or DOCX'))
//     }
//     // if(!file.originalname.endsWith('.pdf')) {
//     //   callback(new Error('Please upload A PDF'))
//     // }

//     callback(undefined, true)
//     // callback(new Error('Please upload a PDF'))
//     // callback(undefined, true)
//     // callback(undefined, false)
//   }
// })


// app.post('/upload', upload.single('upload'), (req, res) => {
//   res.send()
// })