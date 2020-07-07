const bcrypt = require('bcrypt')

const myfunction = async () => {

  // plain text
  const password = 'Avik@123'

  // 2nd parameter says how many times hash function applied on plane text 
  const hashedPassword = await bcrypt.hash(password, 8) 

  console.log(password)
  console.log(hashedPassword)

  const isMatch = await bcrypt.compare(password, hashedPassword)
  console.log(isMatch)
}

myfunction()

// encryption algorithm works as :: 'plain text' -> 'encrypted text' -> 'plain text' (two way algorihtm)
// hashing algorithm works as :: 'plain text' -> 'hashed text' (one way algorithm)