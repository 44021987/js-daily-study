const express = require('express')
const mapLimit = require('async/mapLimit')
const cheerio = require('cheerio')
const superagent = require('superagent')
const eventproxy = require('eventproxy')
const url = require('url')

const app = express()
const port = 5000
const cnodeurl = 'https://cnodejs.org/'

const fetch = async item => {
  const promise = new Promise((resolve, reject) => {
    superagent.get(item)
      .then(topic => {
        console.log(`fecch ${item} successful`)
        resolve({
          href: item,
          html: topic.text
        })
      })
      .catch(err => {
        console.log(err)
      })
  })
  return await promise
}
const render = res => {
  const data = res.map(item => {
    if (item.html) {
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
    }
  })
  return data
}

const test = {
  name: 'admin',
  pwd: '123456'
}

app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: __dirname + '/public/',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  })
})
app.get('/api/userInfo', (req, res) => {
  res.json(test)
}) 

app.get('/api/cnode', (req, res) => {
  superagent.get('https://cnodejs.org/')
    .then(result => {
      const ep = new eventproxy()
      const $ = cheerio.load(result.text)
      const topicUrl = []
      $('.topic_title_wrapper .topic_title').each(function(i, item) {
        topicUrl.push(url.resolve(cnodeurl, $(item).attr('href')))
      })
      // 并发请求一次3个
      mapLimit(topicUrl, 3, async item => {
        const response = await fetch(item)
        return response
      }, (err, data) => {
        res.json(render(data))
      })
    })
    .catch(err => {
      console.log(err)
      res.send('哦, 出错哒~')
    })
})


app.listen(process.env.PORT || port, (req, res) => {
  console.log('server is listen at port ' + port)
})
