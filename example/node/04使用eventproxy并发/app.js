const express = require('express')
const cheerio = require('cheerio')
const superagent = require('superagent')
const eventproxy = require('eventproxy')
const url = require('url')

const app = express()
const port = 3000
const cnodeurl = 'https://cnodejs.org/'

app.get('/', (req, res) => {
  superagent.get('https://cnodejs.org/')
    .then(result => {
      const ep = new eventproxy()
      const $ = cheerio.load(result.text)
      const topicUrl = []
      $('.topic_title_wrapper .topic_title').each(function(i, item) {
        // cnnode对并发做了限制，这里限制一下4条
        if (i > 3) return
        topicUrl.push(url.resolve(cnodeurl, $(item).attr('href')))
      })
      topicUrl.forEach((item, i) => {
        superagent.get(item)
          .then(topic => {
            console.log(`fecch ${item} successful`)
            ep.emit('topic_data', {
              href: item,
              html: topic.text
            })
          })
          .catch(err => {
            console.log(err)
          })
      })
      ep.after('topic_data', topicUrl.length, topic => {
        const data = topic.map(item => {
          const $ = cheerio.load(item.html)
          const $reply = $('.reply_item')
          let result = {
            title: $('.topic_full_title').text().trim(),
            href: item.href,
            comments: []
          }
          $reply.each((i, item) => {
            result.comments.push({
              content: $(item).find('.markdown-text p').eq(0).text(),
              author: $(item).find('.reply_author').text(),
              score: $(item).find('.up-count').text().trim(),
              avatar: $(item).find('.user_avatar img').attr('src')
            })
          })
          return result
        })
        res.send(data)
      })
    })
    .catch(err => {
      console.log(err, 88)
      res.send('哦, 出错哒~')
    })
})

app.listen(port, (req, res) => {
  console.log('server is listen at port ' + port)
})