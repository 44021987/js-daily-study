const express = require('express')
const cheerio = require('cheerio')
const superagent = require('superagent')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  superagent.get('https://cnodejs.org/')
    .then(result => {
      const $ = cheerio.load(result.text)
      const data = []
      $('.topic_title_wrapper .topic_title').each(function(i, item) {
        data.push({
          title: $(item).attr('title'),
          href: $(item).attr('href')
        })
      })
      res.send(data)
    })
    .catch(err => {
      res.send('出错了哟')
      console.log(err)
    })
})

app.listen(port, (req, res) => {
  console.log(`app is listen at port ${port}`)
})