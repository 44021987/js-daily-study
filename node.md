## node.js学习笔记

- [cheerio让node操作dom](https://github.com/cheeriojs/cheerio )  
- utility 加密库
- [superagent发起http请求](http://visionmedia.github.io/superagent/ )
- [eventproxy](https://github.com/JacksonTian/eventproxy )
- [async异步](https://github.com/caolan/async#queueworker-concurrency) 
- [测试框架 mocha](http://mochajs.org/)
- [断言库should](https://github.com/tj/should.js)
- [测试率覆盖工具](https://github.com/gotwarlost/istanbul)
- [前端脚本测试环境搭建](http://phantomjs.org/)
- [nodemon检测代码改动自动重启应用](https://github.com/remy/nodemon)
- [正则表达式30分钟入门教程](http://www.cnblogs.com/deerchao/archive/2006/08/24/zhengzhe30fengzhongjiaocheng.html)
- [Heroku 使用教程](https://www.jianshu.com/p/7bc34e56fa39)
- [Heroku连接云端MongoDB的方法](https://blog.csdn.net/congyihao/article/details/60747447)

- module.exports 与 exports区别
简单来说module.exports是一个指向module对象的指针，一旦重写了module.exports就改变了他的指向。exports是向module对象添加属性和方法。可以测试以下代码test页面打印出来的model是什么
```javascript
const add = n => n + 10
exports.add = add
console.log(module)

const add = n => n + 10
const test = n => n * n
exports.add = add
module.exports = test
console.log(module)

const add = n => n + 10
const test = n => n * n
exports = module.exports = test
exports.add = add
console.log(module)

// 在test页面引入
const model = require('../app')
console.log(model)

```