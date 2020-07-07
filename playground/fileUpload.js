const express = require('express')
const multer = require('multer')

const app = express()
const upload = multer({
  dest: 'images'
})

app.post('/upload',upload.single('upload'), (req, res) => {
  res.send()
})