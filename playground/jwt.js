const jwt = require('jsonwebtoken')

const myfunction = async () => {
  const token = jwt.sign({ _id: 'jkwfsjqkhfkjh189381'}, 'hegadgqjhdwgjetewyjgry', { expiresIn: '7 days'})

  console.log(token)

  const data = jwt.verify(token, 'hegadgqjhdwgjetewyjgry')

  console.log(data)
}

myfunction()