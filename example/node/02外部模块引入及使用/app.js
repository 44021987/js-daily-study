const express = require('express')
const utility = require('utility')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  const q = req.query.q
  if (!q) {
    res.send(`请输入http://localhost:${port}/?q=alsotang查看效果`)
    return
  }
  res.send({
    md5: utility.md5(q),
    sha1: utility.sha1(q)
  })
})

app.listen(port, (req, res) => {
  console.log('app is listen at port ' + port)
})