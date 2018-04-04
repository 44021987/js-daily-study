## 这里只说easy-mock怎么模拟生成数据，mock.js不会的建议先看文档

easy-mock注册简单，注册后会有个测试案例在个人项目里面，都是很简单的东西，这里我只记录下怎么模拟GET和POST请求  
这里是做简单模拟，但是大家可自行生成很多自己需要的数据  
在项目里点击 创建接口 进入创建页面。初始就是一个JSON，在JSON基础写生成的代码

```javascript
// 初始数据
{
  "data": {}
}

/*
* GET请求
* 测试URL：https://www.easy-mock.com/mock/59b62aabe0dc663341a52ff1/example/mocks
*/
{
  "data|6-20": [{ //随机生成6-20组数据
    'userName': '@cname()', // 生成随机姓名
    "count|+1": 1,  // 每次自增加1
    "guid": "@guid", // 随机guid
    "id": "@id", // 随机ID
    "photo": "@image('200x100', @color, @color, @character)"  // 生成一张200*100大小，背景颜色随机，字体颜色随机，图片内含随机字母
  }]
}
// 生成数据如下
{
  "data": [
    {
      "name": "冯霞",
      "count": 1,
      "guid": "2DaeF21B-3Ef8-c0D3-5E24-3aF18c0FEDCD",
      "id": "23000019760907059X",
      "photo": "http://dummyimage.com/'200x100'/ebf279/d579f2&text=Q"
    },
    {
      "name": "贾丽",
      "count": 2,
      "guid": "C8C83ABf-CDe1-D5d4-C1A2-9C8172334c15",
      "id": "810000200508062294",
      "photo": "http://dummyimage.com/'200x100'/79f2b1/f28e79&text=F"
    },
    {
      "name": "邓静",
      "count": 3,
      "guid": "8A2cD37B-5A85-eebD-1031-c89eFD4e128d",
      "id": "710000201312091780",
      "photo": "http://dummyimage.com/'200x100'/7986f2/aaf279&text=T"
    },
    {
      "name": "谭明",
      "count": 4,
      "guid": "1ACC1DEF-2AD8-9D37-F0e0-758a6a0BD1ba",
      "id": "500000200001061126",
      "photo": "http://dummyimage.com/'200x100'/f279cd/79f0f2&text=X"
    },
    {
      "name": "许明",
      "count": 5,
      "guid": "F0707eFC-64d3-FD6E-a9A1-feC1ffC929C4",
      "id": "410000197102184313",
      "photo": "http://dummyimage.com/'200x100'/f2d079/ac79f2&text=7"
    },
    {
      "name": "卢刚",
      "count": 6,
      "guid": "00E282fD-fBEe-FC85-d6Ba-7CEaDc1c7C3F",
      "id": "610000200312082253",
      "photo": "http://dummyimage.com/'200x100'/79f289/f2798c&text=F"
    },
    {
      "name": "常磊",
      "count": 7,
      "guid": "94e5074e-4bba-25Bd-ee03-DAdAF6cc4748",
      "id": "500000200610151717",
      "photo": "http://dummyimage.com/'200x100'/79aff2/d2f279&text=)"
    }
  ]
}

/*
* POST请求
* 测试URL：https://www.easy-mock.com/mock/59b62aabe0dc663341a52ff1/example/postTest
* 前端传参：{userName：'admin'}
*/
{
  "data": {
    success: true,
    msg: function({
      _req, // 请求数据
      mock
    }) {
      const userName = _req.body.userName
      if (userName === 'admin') {
        return '登录成功'
      }
      return '用户不存在'
    }
  }
}

```
以上就分别创建了2个接口，是不是超级简单，在后端接口还没好的时候，前端自己可以模拟出很多数据进行调试呢