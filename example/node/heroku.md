
## 下面是2种不同的方式，但是部署其实是一样的，只是前端页面渲染不同，一个是打包出来的静态页面，一个是没有打包的

### heroku项目部署之前端页面静态化
在heroku上部署一个node项目非常简单，为了简便我都用了express，[源码可以戳这里：heroku部署的一个炒鸡简单的node项目](https://github.com/44021987/js-node-study/tree/master/example/node/lesson09%20heroku%E9%83%A8%E7%BD%B2)。我下面说下可能遇到的坑  
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
- 就酱紫我们部署完了，是不是炒鸡简单,这里是用express渲染了静态网页，路由都在app.js里。  

### 重新更新一个更简便的方法
和上面的步骤其实差不多，，这里没有源码因为模板我一点都没有改，init出来就OK啦。heroku注册登录是必须的了，区别是在于，前端不是渲染的打包好的静态页面，而是nuxt.js渲染出来的。跟着我下面的步骤来实现以下，nuxt有结合express的模板。

```
# 新建一个前后端结合开发的模板

vue init nuxt-community/express-template <project-name>
cd <project-name> 
npm install

# 接下来在本地跑一下代码，如果报错，你可能需要看下backpack有没有安装依赖
# 如果没有安装backpack，在本地安装以下

npm i backpack-core --save

# 这个模板有一个页面及2个接口
# localhost:3000/api/users
# 本地没有问题以后接着在根目录新增一个Procfile文件，文件里写web: npm run dev
# 然后就是提交数据了，和上面一样,但多了一个步骤，跟着我敲代码啦

git init
git add .
git commit -m 'msg'

heroku create # 这一步确保你已经登录了，没有登录请先执行heroku login

# 这一步很关键呀，告诉heroku安装依赖，以生产模式运行，绑定主机

heroku config:set NPM_CONFIG_PRODUCTION=false
heroku config:set HOST=0.0.0.0
heroku config:set NODE_ENV=production

# 最后一步
git push heroku master

```
上面就差不多是一键部署了，其中可能遇到的问题是根目录如果有npm又有yarn那么heroku就会报错告诉你删掉一个，因为他不知道用哪一个安装依赖，你把yarn.lock文件删除即可。heroku官网也有教程，还可以打印信息，错误日志什么的，也可以看看。至此部署node项目差不多就很熟练了，如果后面有时间我会加上接入远程数据库的笔记。