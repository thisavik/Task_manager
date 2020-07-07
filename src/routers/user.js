const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')

const router = new express.Router()

// this is for creating user (signup)
router.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({user, token})
  } catch (error) {
    res.status(400).send(error)
  }

})

// for login
router.post('/users/login', async (req, res) => {

  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch(error) {
    res.status(400).send()
  }
})

// for logout
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })

    await req.user.save()

    res.send()
  } catch (error) {
    res.status(500).send()
  }
})

// for logoutAll 
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []

    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }
})

// initially // this for find multiple document
// read profile
router.get('/users/me', auth, async (req, res) => {

  res.send(req.user)

  // try {
  //   const users = await User.find({ })
  //   res.send(users)
  // } catch(error) {
  //   res.status(500).send()
  // }

})


// no need
// // this for find single user via ID
// router.get('/users/:id', async (req, res) => {

//   const _id = req.params.id

//   try {
//     const user = await User.findById(_id)
//     if(!user) {
//       return res.status(404).send()
//     }

//     res.send(user)
//   } catch (error) {
//     res.status(500).send()
//   }

// })

// initial: update user via ID
// current: update who is authenticated
router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if(!isValidUpdate) {
    return res.status(400).send({ error: 'Invalid Updates!'})
  }

  try {
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

    // const user = await User.findById(req.params.id)

    // if(!user) {
    //   return res.status(404).send()
    // }    

    updates.forEach((update) => req.user[update] = req.body[update])

    await req.user.save()

    res.send(req.user)
  } catch(error) {
    res.status(400).send(error)
  }
})

// initial: deleting user via id
// cuurent: delete who is already authenticated
router.delete('/users/me', auth, async (req, res) => {

  try {
    // const user = await User.findByIdAndDelete(req.params.id)

    // if(!user) {
    //   return res.status(404).send()
    // }

    req.user.remove()

    res.send(req.user)
  } catch(error) {
    res.status(500).send()
  }
})

// upload files
// POST /users/me/avatar
const upload = multer({
  // dest: 'avatars',
  limits : {
    fileSize: 1000000
  },
  fileFilter(req, file, callback) {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error('Please upload image'))
    }

    callback(undefined, true)
  }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
  req.user.avatar = req.file.buffer
  await req.user.save()
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

// deleting avatar
router.delete('/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined
  await req.user.save()
  res.send()
})

module.exports = router