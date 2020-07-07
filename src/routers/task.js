const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')

const router = new express.Router()

// this is for creating task
router.post('/tasks', auth, async (req, res) => {
  // const task = new Task(req.body)

  const task = new Task({
    ...req.body,
    owner: req.user._id
  })
  try {
    await task.save()
    res.status(201).send(task)
  } catch(error) {
    res.status(400).send(error)
  }

})


// this is for fetch multiple task
// GET /tasks/?completed=true
// GET /tasks/?limit=2&skip=2
router.get('/tasks', auth, async (req, res) => {
  const match = {}

  if (req.query.completed) {
    match.completed = req.query.completed === 'true'
  }

  const sort = {}

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }
  try {
    // const tasks = await Task.find({ owner: req.user._id })


    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
      }
    }).execPopulate()

    res.send(req.user.tasks)
  } catch(error) {
    res.status(500).send()
  }

})


// this for fetching single task
router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id

  try {
    // const task = await Task.findById(_id)

    const task = await Task.findOne({ _id, owner: req.user._id })
    if(!task) {
      return res.status(404).send()
    }

    res.send(task)
  } catch(error) {
    res.status(500).send()
  }

})

// update task via ID
router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if(!isValidUpdate) {
    return res.status(400).send({ error: 'Invalid Update!'})
  }
  try {
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

    // const task = await Task.findById(req.params.id)

    const task = await Task.findOne({_id: req.params.id, owner: req.user._id})

    if(!task) {
      return res.status(404).send()
    }

    updates.forEach((update) => task[update] = req.body[update])

    await task.save()

    res.send(task)
  } catch(error) {
    res.status(400).send(error)
  }
})

// delete task via ID
router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    // const task = await Task.findByIdAndDelete(req.params.id)

    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

    if(!task) {
      return res.status(404).send()
    }

    res.send(task)
  } catch(error) {
    res.status(500).send()
  }
})

module.exports = router
