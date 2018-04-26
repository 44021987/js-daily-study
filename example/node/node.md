## 《node.js入门小练习集合》
[node.js入门小练习集合源码请戳这里](https://github.com/44021987/mark/blob/master/example/node)
node.js入门练习源码，跟着[Node.js 包教不包会](https://github.com/alsotang/node-lessons)做，有些地方做了小小改动，用了es6以及es7。

- lesson01 基于express服务启动
- lesson02 外部模块引入及使用
- lesson03 node简单小爬虫实现
- lesson04 使用eventproxy并发
- lesson05 使用async控制并发数量,使用async await返回异步处理的数据
- lesson06 mocha/should/istanbul测试用例学习  
在lesson06目录下执行npm test进行测试(这里下windows执行语句有个坑，具体看package.json中test)，测试代码在test/test.main.js里。

### 下面记录下heroku项目部署
在heroku上部署一个node项目非常简单，可以参考[heroku部署node项目](https://blog.csdn.net/u011997156/article/details/40920423)跟着做一遍。我下面说下可能遇到的坑  
- 科学上网，申请一个账号，获取验证码的时候需要翻墙，不墙一下你会莫名其妙的因为注册点了没反应
- 注册邮箱qq家、网易家的都不行，国内的大概只有新浪可以
- 必须在根目录新建一个Procfile没有后缀的文件，在里面写web: node app.js，意思是告诉服务器给你执行app.js入口文件启动服务安装依赖
- 部署其实很简单在根目录下执行这么的语句，前提是有安装git,一定要在init后create，不然可能会报错
```
heroku login  // 登录后输入自己的账户密码

git init
git add .
git commit -m 'msg'

heroku create

git push heroku master

```
- 部署完了，说说前后分离的开发，在本地是分别开2个端口，没有问题，我用nuxt.js尝试和后端的node一起部署到heroku，但是我失败了，最后只能把前端代码打包出来放在后端代码里静态化。  

最后nuxt.js其实可以部署在heroku官网上有文档，可惜我就是失败了，如果你成功了，请联系我，一起学习。菜鸟进阶之路不易T.T