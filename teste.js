const bcrypt = require('bcryptjs')


const password = '6055302'

const salt = bcrypt.genSaltSync(10)
const hash = bcrypt.hashSync(password, salt)

console.log(hash)