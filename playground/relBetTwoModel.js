const Task = require('../src/models/task')

const main = async () => {
  const task = await Task.findById('5ede54bd8510b28814471f85')
  
  // as this below line execute the _id saved in owner populate the document and save  that into own property 
  await task.populate('owner').execPopulate() 
  console.log(task.owner)
}

main()