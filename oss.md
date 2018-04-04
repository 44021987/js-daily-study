## 阿里云前端直传解决方案
本例子基于只有图片的相对路径或者绝对路径的时候需要上传到OSS（如果是通过input file获取的file对象可以对应修改下代码。前端直传的弊端是你的所有oss配置数据都是在代码可见的，可以参考官网例子由后台返。
```javascript
const ossConfig = {
  url: '你的 oss url',
  accessKeyId: '你的 accessKeyId',
  accessKeySecret: '你的 accessKeySecret',
  bucket: '你的 bucket'
}
/**
 * 根据图片地址获取file对象,上传至oss
 * opts参数说明
 * @param   {url} 图片相对路径或绝对路径
 * @param   {fileAs} 文件保存路径 engId_1406/loginName_jldw/DesignHandOver/0.png"
 * @param   {success} 成功的回调函数->返回result
 * @param   {err} 失败的回调函数->返回err
 */
app.ossImg = function (opts) {
  var xhr = new XMLHttpRequest(),
    that = this;
  xhr.open("GET", opts.url, true);
  xhr.setRequestHeader('Accept', 'image/jpeg');
  xhr.responseType = "blob";
  xhr.send();
  // xhr发送成功
  xhr.onload = function (e) {
    var imgName = opts.fileAs.split('/').pop(),
      blob = xhr.response,
      // oss验证必须
      policyText = {
        "expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
        "conditions": [{
            "bucket": ossConfig.bucket
          },
          ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
        ]
      },
      policy = Base64.encode(JSON.stringify(policyText)), // 需要引入Base64相关js
      accesskey = ossConfig.accessKeySecret,
      signature = b64_hmac_sha1(accesskey, policy),
      ossData = new FormData(),
      ossXhr = new XMLHttpRequest(),
      oType = 'image/jpeg'; //mime类型
    if (/mp4/.test(imgName.split('.').pop())) {
      oType = 'video/mp4';
    }
    // 获取blob文件流
    var imgFile = new File([blob], imgName, {
      type: oType
    })
    // formdata
    ossData.append('OSSAccessKeyId', ossConfig.accessKeyId);
    ossData.append('policy', policy);
    ossData.append('Signature', signature);
    ossData.append('key', opts.fileAs);
    ossData.append('success_action_status', 200); // 指定返回的状态码
    ossData.append('file', imgFile);
    // xhr上传
    xhr.upload.onloadstart = function () { //上传开始执行方法
      oloaded = 0; //设置上传开始时，以上传的文件大小为0
    };
    ossXhr.upload.addEventListener("progress", _uploadProgress, false);
    ossXhr.addEventListener("load", _uploadComplete, false);
    ossXhr.addEventListener("error", _uploadFailed, false);
    ossXhr.open('POST', ossConfig.url, true); //MUST BE LAST LINE BEFORE YOU SEND 
    ossXhr.send(ossData);
  };
  // 上传进度
  function _uploadProgress(e) {
    var percentComplete = 0;
    console.log(e.loaded, e.total)
    if (e.lengthComputable) {
      percentComplete = Math.round(e.loaded * 100 / e.total);
    }
    console.log(percentComplete)
    if (typeof opts.progress === 'function') opts.progress(percentComplete);

  }
  // 上传成功回调
  function _uploadComplete(e) {
    var src = e.target.responseURL + opts.fileAs;
    if (e.target.status === 200 && typeof opts.success === 'function') opts.success(src);
  }
  // 上传失败回调
  function _uploadFailed(e) {
    if (typeof opts.err === 'function') opts.err(e);
    alert('err')
  }
}
```
## oss前端使用不完全填坑手册
- 获取图片缩略图：只需要在url后面加上?x-oss-process=image/resize,w_150 （w_150中的150表示缩略图的尺寸，可自行定义，oss会按原图等比例缩放）