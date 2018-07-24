## js面试中经常会提到的基础概念总结
都是自己想到什么写什么，对于答案总结难免出错，欢迎指正交流，相互学习。

#### js基本数据类型
null undefined string number boolean object symbol
### typeof 类型
string number object function boolean symbol  
只需要记住对于基本类型只有typeof null 是 object,其他和数据类型显示一样  
对于对象只有typeof function 是 function, 其他都是返回object
### js中的假值
除了undefined， null， false， NaN， ''， 0， -0，其他都是真值
### 闭包
我通俗的解释几个概念：  
- js基于词法作用域：词法作用域简单来讲就是函数在创建时的作用域在执行时依然有效，意思就是你生在哪里，无论你以后人在北上广还是其他地方，你家乡还是你家乡
- 闭包： 简单来讲一个函数体内返回了另一个函数，这时候函数体内就会形成闭包。闭包能缓存作用域，如果你理解了词法作用域那就能很好的理解闭包，函数体内返回的函数在创建的时候记住的当前的作用域环境，在它执行的时候依然能够访问。
- 为什么说闭包容易造成内存泄漏：如果闭包里面返回的函数应用了他创建时父级作用域的变量，并且一直保持引用不释放，这时候就会造成内存泄漏（因为js的垃圾回收机制不会回收还保持引用的变量）
- 闭包最常见的用法：模块化、单例模式、柯理化、高阶函数等
### h5新特性、css3新特性
### 了解AJAX么，如何实现跨域
AJAX的核心XMLhttpRequest,jsonp可以实现跨域。原理是通过script标签的src属性实现跨域，通过callback传递response，只支持get请求
### 优化网页加载速度
  - js文件加载是阻塞的，放在body最后引入
  - 压缩图片\js\css文件
  - 利用浏览器缓存
  - 为支持gzip的浏览器进行gzip压缩（Accept-Encoding: gzip, deflate）
  - 资源请求放在同一个域名下，减少域名解析时间
  - 使用cdn
### 什么操作引起内存泄漏
内存泄漏：指一部分内存既不能被使用到，又不能销毁（回收），直到浏览器进程结束。js有垃圾回收机制。当局部变量没有被使用时，会被垃圾回收机制清理掉。  
有2中清理方式：标记清理、引用计数
 - 不必要的全局变量，如在函数内部定义的没有使用var let等声明的变量
 - 闭包
 - 定时器和回调函数
 - 没有被清理的DOM元素
 ### js的继承方式
 - 1.构造继承
 ```javascript
function Animal () {
  this.sayHi = () => {
    return this.name
  }
}
function Cat (name = 'miao') {
  Animal.call(this)
  this.name = name
}
const cat = new Cat()
cat.sayHi() // miao
 ```
 - 2.原型继承
 ```js
 // 缺点：所有子类原型共用同一个父类实例的属性和方法
 class Animal {
  constructor () {
    this.property = 'Animal'
    this.test = [1, 2]
  }
  sayHi () {
    console.log(this.name)
  }
}

function Cat (name = 'miao') {
  this.name = name
}
Cat.prototype = new Animal()
Cat.prototype.constructor = Cat

const cat = new Cat()
const dog = new Cat('wang')
cat.sayHi() // miao
cat.test.push(3)
console.log(dog.test) // 1,2,3
 ```

 - 3.组合继承
 ```js
 // 父类被构造了2次，子类的实例会拥有2分属性
 function Animal (name = 'Animal') {
    this.propoerty = 'Animal'
      this.name = name
  }
  Animal.prototype.sayHi = function () {
    console.log(this.name)
  }

  function Cat (name = 'Cat') {
    Animal.call(this, name)
  }
  Cat.prototype = new Animal()
  Cat.prototype.constructor = Cat
 ```
 - 4.组合继承优化1
 ```js
 // 解决父类被实例化2次的问题，但是子类实例的构造函数指向丢失
function Animal () {
  this.property = 'Animal'
  this.test = [1, 2]
}
function Cat() {
  Animal.call(this)
}
Cat.prototype = Animal.prototype
const cat1 = new Cat()
console.log(cat1.constructor.name) // Animal
 ```
  - 5.组合继承优化2
 ```js
 // ES5最优解决方案
function Animal () {
  this.property = 'Animal'
  this.test = [1, 2]
}
function Cat() {
  Animal.call(this)
}
Cat.prototype = Object.create(Animal.prototype)
Cat.prototype.constructor = Cat
const cat1 = new Cat()
console.log(cat1.constructor.name) // Cat
 ```
 Object.create
 ```js
 // Object.create()
function objectCreate(obj) {
  if (Object.create) return Object.create(obj)
  function F() {}
  F.prototype = obj
  return new F()
}
 ```
 - 6.ES6继承extend
 ES6的继承方便了很多，避免了手动去改原型链的继承方式，语法糖了解一下，清晰易懂。
### http和https区别及各自默认端口
https中的s指SSL；http默认端口80/8080等，https默认端口443
### DOCTYPE声明的作用
### 数组的一些操作
```js
// 冒泡排序
function bubbleSort(arr) {
  arr.forEach((item, i) => {
    for (let k = i + 1; k < arr.length; k++) {
      if (arr[i] > arr[k]) {
        [arr[i], arr[k]] = [arr[k], arr[i]]
      }
    }
  })
  return arr
}
// sort函数
function normalSort (arr) {
  return arr.sort((a, b) => a - b)
}
// 找出字符串或数组中出现最多次的元素
function foo(arr) {
  return arr.reduce((obj, item) => {
    obj[item] ? obj[item]++ : obj[item] = 1
    return obj
  }, {})
}
```
### 柯里化
沿用曾探《JavaScript设计模式与开发实践》里面的概念：currying 又称部分求值。一个 currying 的函数首先会接受一些参数，接受了这些参数之后，该函数并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保存起来。待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性用于求值。
```js
// 一个通用的currying函数
// 注意这里用到闭包和递归
function currying(fn) {
  let result = [];
  return function callback (...rest) {
    if (!rest.length) {
      const sum = fn.apply(this, result)
      result = null
      return sum
    }
    result = result.concat(rest)
    return callback
  }
}
const add = currying(function (...rest) {
  return rest.reduce((sum, item) => {
    return sum += item
  }, 0)
})
console.log(add(1)(2, 3)(4)()) // 10
```
### 通用的单例模式(实际是对闭包的应用)
```js
function getSingle (fn) {
  let result = null
  return function () {
    return result || (result = fn.apply(this, arguments))
  }
}
```
### 对象的深浅拷贝
对象的拷贝问题，首先我们需要知道引用类型、基本值类型、指针这几个概念。如果不懂的，那就去补基础的基础。
```js
const obj = {
  test: 'hello world',
  color: ['red', 'blue'],
  deep: {
    a: [1],
    b: [2]
  },
  sayHello() {
    console.log(this.color.join(','))
  }
}
/**
 * 浅拷贝
 * 只能深度拷贝值是基本类型的属性和方法，对于值是引用类型的属性还是指针引用
*/
const obj1 = {}
const obj2 = Object.assign(obj)
const obj3 = { ...obj }
for (let key in obj) obj1[key] = obj[key]
obj.color.push('yellow')
obj1.color.push('black')
obj1.sayHello = function () {
  console.log(this.test)
}
obj1.sayHello() // hello world
obj2.sayHello() // red,blue,yellow,black
obj3.sayHello() // red,blue,yellow,black
/**
 * 深拷贝
 * JSON.tringify转换成对象字符串后再解析成JSON，可以深度拷贝所有属性，但对方法不起作用
 * 递归实现深拷贝
 */
function deepCloneObj(obj) {
  const copy = obj instanceof Array ? [] : {}
  for (let key in obj) {
    const item = obj[key]
    if (!!item && typeof item === 'object') {
      copy[key] = deepCloneObj(item)
    } else {
      copy[key] = obj[key]
    }
  }
  return copy
}
const obj4 = JSON.parse(JSON.stringify(obj))
const obj5 = deepCloneObj(obj)
console.log(obj4) // sayHello方法丢失
console.log(obj5) // 完全深度复制
```
***

### 小技巧
```js
// | 0取整
-1.9 | 0
// 判断奇偶数 & 1 => result 0 偶数 1 基数
```