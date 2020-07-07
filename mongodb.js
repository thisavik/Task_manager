//  CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())
// console.log(id.id)
// console.log(id.id.length)
// console.log(id.toHexString())
// console.log(id.toHexString().length)

MongoClient.connect(connectionURL, { useNewUrlParser : true , useUnifiedTopology: true}, (error, client) => {
  if(error) {
    return console.log('Unable to connect to database...')
  }

  console.log('Connected Successfully !!!')
  const db = client.db(databaseName)

// // inserting data in database. Either one or many at a time

//   db.collection('users').insertOne({
//     name: 'Abhishek',
//     age: 21
//   }, (error, result) => {
//     if(error) {
//       return console.log('Unable to insert user')
//     }

//     console.log(result.ops)
//   })

//   db.collection('users').insertMany([
//     {
//       name: 'Ankur Rai',
//       age: 20
//     },
//     {
//       name: 'Anku Kumar',
//       age: 17
//     }
//   ], (error, result) => {
//     if(error) {
//       return console.log('Unable to insert document')
//     }

//     console.log(result.ops)
//   })

//   db.collection('tasks').insertMany([
//     {
//       description: 'Clean the house',
//       completed: true
//     },
//     {
//       description: 'solve DP problem',
//       completed: false
//     },
//     {
//       description: 'buy vegetables',
//       completed: false
//     }
//   ], (error, result) => {
//     if(error) {
//       return console.log('Unable to insert Tasks')
//     }

//     console.log(result.ops)
//   })

// // find(Read operation) data in the database. either one or many at a time

//   db.collection('users').findOne({ _id: new ObjectID('5ec6607b3ad87d585c135d8b') }, (error, user) => {
//     if(error) {
//       return console.log('Unable to fetch')
//     }

//     console.log(user)
//   })

// // find returns a cursor(simply say pointer) to the starting record of data fetched

//   db.collection('users').find({ age: 21 }).toArray((error, users) => {
//     if(error) {
//       return console.log('Unable to fetch data')
//     }

//     console.log(users)
//   })

//   db.collection('users').find({ age: 21 }).count((error, count) => {
//     if(error) {
//       return console.log('Unable to fetch data')
//     }

//     console.log(count)
//   })

  // db.collection('tasks').findOne({ _id: new ObjectID('5ec662233370f628c43feeb6') }, (error, task) => {
  //   if(error) {
  //     return console.log('Unable to fetch')
  //   }

  //   console.log(task)
  // })

  // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
  //   if(error) {
  //     return console.log('Unable to fetch')
  //   }

  //   console.log(tasks)   
  // })

// update opeartion

  // const updatePromise = db.collection('users').updateOne({ 
  //   _id: new ObjectID('5ec630b01b2d3d5de4acf563') 
  // }, {
  //   $set: {
  //     name: 'Andrew'
  //   }
  // })

  // updatePromise.then((result) => {
  //   console.log(result)
  // }).catch((error) => {
  //   console.log(error)
  // })

// // Above code can be chained like this

//   db.collection('users').updateOne({ 
//     _id: new ObjectID('5ec630b01b2d3d5de4acf563') 
//   }, {
//     $inc: {
//       age: 2
//     }
//   }).then((result) => {
//     console.log(result)
//   }).catch((error) => {
//     console.log(error)
//   })

  // db.collection('users').updateOne({
  //     _id: new ObjectID("5ec65cb4e1978147b83c6b5b")
  //   }, {
  //     $set: {
  //       name: "John"
  //     }
  //   }, (error, result) => {
  //     if(error) {
  //       return console.log('unable to Update')
  //     }

  //     console.log(result)
  //   })

  // db.collection('tasks').updateMany({
  //   completed: false
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }).then((result) => {
  //   console.log(result)
  // }).catch((error) => {
  //   console.log(error)
  // })

// // delete operation

//   db.collection('users').deleteMany({
//     age: 21
//   }).then((result) => {
//     console.log(result)
//   }).catch((error) => {
//     console.log(error)
//   })

//   db.collection('tasks').deleteOne({
//     description : "Clean the house"
//   }).then((result) => {
//     console.log(result)
//   }).catch((error) => {
//     console.log(error)
//   })

})
