// aes加密 引入aes.js
const aesEncode = function (word) {
  var val = this.config.aesCodeVal, // 盐值，必须与后台对应
    key = CryptoJS.enc.Utf8.parse(val),
    iv = CryptoJS.enc.Utf8.parse(val),
    srcs = CryptoJS.enc.Utf8.parse(word),
    encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  var str = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  return encodeURIComponent(str); // encodeURIComponent转义特殊url符合，如果不需要转义直接return str
}
// aes解密 根据需求
const aesDecode = function (word) {
  // 删除回车换行及多余引号\转义后再解密
  word = decodeURIComponent(word.replace(/%0D%0A/g, '').replace(/'|"/g, ''));
  var val = this.config.aesCodeVal, // 盐值，必须与后台对应
    key = CryptoJS.enc.Utf8.parse(val),
    iv = CryptoJS.enc.Utf8.parse(val),
    decrypt = CryptoJS.AES.decrypt(word, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  return decrypt.toString(CryptoJS.enc.Utf8);
}

// sha384 引入crypto.js
const sha384 = function (msg) {
  return CryptoJS.SHA384(msg).toString();
}

// RSA加密
const rsaEncode = function (msg) {
  const encrypt = new JSEncrypt();
  encrypt.setKey(app.config.rsaKey); // app.config.rsaKey必须与后台一致
  return encrypt.encrypt(msg)
}