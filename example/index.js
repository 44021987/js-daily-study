/**
 * 把一个字符串的大小写取反（大写变小写小写变大写），例如 ’AbC' 变成 'aBc'
 * @param {string} str 
 */
function tranStr(str) {
  if (typeof str !== 'string') return str
  const splitStr = str.split('')
  return splitStr.reduce((res, s) => {
    if (/[a-z]/g.test(s)) {
      res += s.toLocaleUpperCase()
    } else if (/[A-Z]/g.test(s)) {
      res += s.toLocaleLowerCase()
    } else {
      res += s
    }
    return res
  }, '')
}
/**
 * 把一个字符串的大小写取反（大写变小写小写变大写），例如 ’AbC' 变成 'aBc'
 * @param {*} str 
 */
function tranStr2(str) {
  if (typeof str !== 'string') return str
  return str.replace(/[a-zA-Z]/g, function(s) {
    return /[a-z]/g.test(s) ? s.toLocaleUpperCase() : /[A-Z]/g.test(s) ? s.toLocaleLowerCase() : s
  })
}

function find(s, t) {
  console.log(s.match(/t?/g))
}
find('aaadd555d5', 'd5')