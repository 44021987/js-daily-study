const mongoose = require('mongoose')
// const url = 'mongodb://localhost:27017/blog'
const url = 'mongodb://@ds139067.mlab.com:39067/stone'
const user = {
  user: '你的mlab数据库用户名',
  pass: '你的mlab数据库密码'
}
const userSchema = new mongoose.Schema({
  username: String,
  pwd: String
})
const userModel = mongoose.model('userModel', userSchema)
const userDoc = [
  {
    username: 'sg',
    pwd: '123456'
  },
  {
    username: 'admin',
    pwd: '123456'
  }
]

mongoose.connect(url, user, err => {
  if (err) throw err
  console.log('conect successfuly')
  userModel.insertMany(userDoc, (err, result) => {
    console.log(result)
  })
  // userModel.findOneAndRemove({username: 'admin'}, (err, doc) => {
  //   console.log(doc)
  // })
  userModel.find().then(res => {
    console.log(res)
  })
})

