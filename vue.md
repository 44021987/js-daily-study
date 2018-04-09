## VUE不完全填坑指南

1. vue如何挂载一个全局的方法呢？
假如你引入了一个JS方法想要在每个页面都能直接使用而不是每次都import，那么就需要将这个方法全局挂载在Vue实例上
```javascript
// 在main.js入口文件里面先import，然后挂载在Vue实例的prototype上
// 这样就可以在每一个页面都能使用this.$http
// 本例是在request里面封装了axios方法
import Vue from 'vue'
import $http from '@/utils/request'
Vue.prototype.$http = $http
```

2. axios本地调试时如何使用代理解决跨域问题
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

3. axios中POST请求后台无法获取到数据解决方案
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
4. 在vue中子父组件传值需要注意的问题
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

