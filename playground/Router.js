const express = require('express')
const port = 3001
const app = express()

// app.get('/test', (req, res) => {
//   res.send('This from Main file')
// })

const router = new express.Router()

router.get('/test', (req, res) => {
  res.send('This is from another file :)')
})
app.use(router)

app.listen(port, () => {
  console.log('Server is running at port : ', port)
})



