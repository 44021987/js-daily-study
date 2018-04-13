## VUE不完全填坑指南
- **vue-router的同步与异步加载**
在项目开发过程中如果页面很多的情况下仍然使用异步加载路由的方式就会造成打包速度超级慢有木有，这时候你可能会想到在开发的时候用同步方式，在上线后用异步加载方式。这个时候就涉及到webpack打包的模块化系统。webpack支持 CommonJS、AMD 和 ES6 的打包方式。我们可以像下面这样做：
```javascript
// 新建_import_production.js
module.exports = file => () => import('@/views/' + file + '.vue')
// 新建_import_development.js
module.exports = file => require('@/views/' + file + '.vue').default
// 在路由里面导入，process.env.NODE_ENV动态获取开发模式，可能需要自己定义，下文也有介绍
const _import = require('./_import_' + process.env.NODE_ENV)
```
这里又有一个问题，在require的时候为什么要获取default的属性呢？require 是 CommonJS的模块导入方式，不支持模块的默认导出，因此导入的结果其实是一个含 default 属性的对象，因此需要使用 .default 来获取实际的组件选项。如果不知道的可以看看webpack的相关基础知识。

- **vue如何挂载一个全局的方法呢？**
假如你引入了一个JS方法想要在每个页面都能直接使用而不是每次都import，那么就需要将这个方法全局挂载在Vue实例上
```javascript
// 在main.js入口文件里面先import，然后挂载在Vue实例的prototype上
// 这样就可以在每一个页面都能使用this.$http
// 本例是在request里面封装了axios方法
import Vue from 'vue'
import $http from '@/utils/request'
Vue.prototype.$http = $http
```

- **axios本地调试时如何使用代理解决跨域问题**
```javascript
// 在config/index.js中proxyTable设置
// 设置完后在页面里面的/api/aaa就会请求为http://192.168.60.96:8080/test-admin/aaa
module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': { 
        target: 'http://192.168.60.96:8080/test-admin/',
        secure: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
```

- **如何区分开发环境和生产环境来设置不同的baseurl**  
由于在开发环境调试时的接口地址和正式环境可能不同，有没有方法设置后就不用每次打包都去修改url呢？   
process.env.BASE_API可以获取baseurl，当然前提是你有在代码里面设置。
```javascript

// 要获取process.env.BASE_API需要设置2个文件

// config里dev.env.js里设置BASE_API
// 由于我在本地调试涉及到跨域，在proxyTable里面已经做了代理所以开发环境的BASE_API设置成空字符串
module.exports = {
  NODE_ENV: '"development"',
  BASE_API: '""'
}

// config里prod.env.js里设置BASE_API
module.exports = {
  NODE_ENV: '"production"',
  BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"'
}

```


- **axios中POST请求后台无法获取到数据解决方案**  
在与后台调试中发现POST过去的数据后台接收不到，这是因为axios过去的数据格式是JSON格式，不是formdata格式的数据，所以后台获取不到。这时候需要设置Content-Type并且引入qs使用Qs.stringify(data)解析一下需要传给后台的data数据
```javascript
import axios from 'axios'
import Qs from 'qs'

const baseConfig = {
  timeout: 15000, // 请求超时时间
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
}
if (process.env.BASE_API) {
  baseConfig.baseURL = process.env.BASE_API // api的base_url
}
// 创建axios实例
const service = axios.create(baseConfig)

// request拦截器
service.interceptors.request.use(config => {
  if (config.method === 'post') {
    config.data = Qs.stringify(config.data)
  }
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})
```
- **在vue中子父组件传值需要注意的问题**  
在使用element-ui封装dialog组件的时候发现element-ui中的dialog在关闭时会修改props中传过来的是否关闭的那个判断值，这时候vue会报错。我在这卡了很久不知道怎么修改，最后发现element-ui修改了props里面的值，这是不允许的。在封装的时候需要解耦，把关闭事件通过$emit通过父组件去修改传进来时的那个值。不清楚我的描述是否能看懂，但是有一点就是子组件不能修改props，如果需要修改props就必须通过$emit在父组件里面修改
```javascript
// 父组件
// 父组件通过dialogClose监听子组件关闭事件
<zdialog :visible="dialogFormVisible" @dialogClose="dialogClose"></zdialog>
export default {
  name: 'dashboard',
  components: {
    Zdialog
  },
  data() {
    return {
      dialogFormVisible: false,
    }
  },
  methods: {
    dialogClose(type) {
      console.log(type)
      this.dialogFormVisible = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}

// 子组件通过$emit通知父组件 关闭事件
 <el-dialog title="收货地址" :visible.sync="show" ref="dialog" @close="dialogFormVisible(0)"></el-dialog>
 export default {
  name: 'testdialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    show: {
      get() {
        return this.visible
      },
      set() {}
    }
  },
  methods: {
    dialogFormVisible(type) {
      this.$emit('dialogClose', type) // type 0 关闭 1 确认
    }
  }
}
```

