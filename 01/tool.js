// 1. 校验数据类型
const getTypeOf = (obj) => {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}
// console.log(getTypeOf(3333))

// 2. 防抖
const debounce = (() => {
  let timer = null;
  return (callback, wait = 800) => {
    timer && clearTimeout(timer);
    timer = setTimeout(callback, wait);
  }
})()

// console.log(222)
// debounce(() => {
//   console.log(3333)
// }, 3000)

// 3. 节流
const throttle = (() => {
  let last = 0;
  return (callback, wait = 800) => {
    let now = +new Date();
    if (now - last > wait) {
      callback();
      last = now;
    }
  }
})()
// console.log(111);
// throttle(() => {
//   console.log(2222);
// }, 5000)

// 4. 手机号脱敏
const hideMobile = (mobile = '') => {
  return mobile.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")
}
// console.log(hideMobile('13567577855'))

// 5. 开启全屏
const launchFullscreen = (element) => {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen()
  }
}

// 6. 关闭全屏
const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
}

/**
 * 7. 大小写转换
 * @param str
 * @param type 1 - 全大写， 2 - 全小写， 3 - 首字母大写
 * @returns {string}
 */
const turnCase = (str = '', type) => {
  switch (type) {
    case 1:
      return str.toUpperCase();
    case 2:
      return str.toLowerCase();
    case 3:
      return str[0].toUpperCase() + str.substring(1).toLowerCase();
    default:
      return str;
  }
}

// 8. 解析URL参数
const getSearchParams = () => {
  const searchPar = new URLSearchParams(window.location.search)
  const paramsObj = {}
  for (const [key, value] of searchPar.entries()) {
    paramsObj[key] = value
  }
  return paramsObj
}

// 9. 判断手机是Andoird还是IOS
/**
 * 1: ios
 * 2: android
 * 3: 其它
 */
const getOSType = () => {
  let u = navigator.userAgent, app = navigator.appVersion;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isIOS) {
    return 1;
  }
  if (isAndroid) {
    return 2;
  }
  return 3;
}

// 10. 数组对象根据字段去重
/**
 * arr 要去重的数组
 * key 根据去重的字段名
 */
const uniqueArrayObject = (arr = [], key = 'id') => {
  if (arr.length === 0) return;

  let list = [];
  const map = {};
  arr.forEach(item => {
    if (!map[item[key]]) {
      map[item[key]] = item;
    }
  })
  list = Object.values(map);

  return list;
}

// 11. uuid
const getUuid = () => {
  const temp_url = URL.createObjectURL(new Blob());
  const uuid = temp_url.toString();
  URL.revokeObjectURL(temp_url);
  return uuid.substring(uuid.lastIndexOf('/') + 1);
}

/**
 * 12. 金额格式化
 * @param number 要格式化的数字
 * @param decimals 保留几位小数
 * @param dec_point 小数点符号
 * @param thousands_sep 千分位符号
 * @returns {string}
 */
const moneyFormat = (number, decimals, dec_point, thousands_sep) => {
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  const n = !isFinite(+number) ? 0 : +number
  const prec = !isFinite(+decimals) ? 2 : Math.abs(decimals)
  const sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep
  const dec = typeof dec_point === 'undefined' ? '.' : dec_point
  let s = ''
  const toFixedFix = function (n, prec) {
    const k = Math.pow(10, prec)
    return '' + Math.ceil(n * k) / k
  }
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  const re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2')
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}

/**
 * 13. 存储操作
 */
class MyCache {
  constructor(isLocal = true) {
    this.storage = isLocal ? localStorage : sessionStorage
  }

  setItem(key, value) {
    if (typeof (value) === 'object') value = JSON.stringify(value)
    this.storage.setItem(key, value)
  }

  getItem(key) {
    try {
      return JSON.parse(this.storage.getItem(key))
    } catch (err) {
      return this.storage.getItem(key)
    }
  }

  removeItem(key) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }

  key(index) {
    return this.storage.key(index)
  }

  length() {
    return this.storage.length
  }
}

const localCache = new MyCache()
const sessionCache = new MyCache(false)

export { localCache, sessionCache }

sessionCache.setItem('name', '树哥')

/**
 * 14 下载文件
 * @param api
 * @param params
 * @param fileName
 * @param type
 */
const downloadFile = (api, params, fileName, type = 'get') => {
  axios({
    method: type,
    url: api,
    responseType: 'blob',
    params: params,
  }).then((res) => {
    let str = res.headers['content-disposition']
    if (!res || !str) {
      return
    }
    let suffix = ''
    // 截取文件名和文件类型
    if (str.lastIndexOf('.')) {
      fileName ? '' : fileName = decodeURI(
        str.substring(str.indexOf('=') + 1, str.lastIndexOf('.')))
      suffix = str.substring(str.lastIndexOf('.'), str.length)
    }
    //  如果支持微软的文件下载方式(ie10+浏览器)
    if (window.navigator.msSaveBlob) {
      try {
        const blobObject = new Blob([res.data]);
        window.navigator.msSaveBlob(blobObject, fileName + suffix);
      } catch (e) {
        console.log(e);
      }
    } else {
      //  其他浏览器
      let url = window.URL.createObjectURL(res.data)
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', fileName + suffix)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(link.href);
    }
  }).catch((err) => {
    console.log(err.message);
  })
}

/**
 * 15. 深度拷贝
 * @param obj
 * @returns {*[]}
 */
const deepCopy = (obj) => {
  let result = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key]) {
        result[key] = deepCopy(obj[key]); //递归复制
      } else if (typeof obj[key] === 'string' && obj[key]) {
        result[key] = obj[key].trim();
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
}

/**
 * 16. 模糊搜索
 * @param list
 * @param keyword
 * @param attribute
 * @returns {*[]}
 */
const fuzzyQuery = (list, keyword, attribute = 'name') => {
  const reg = new RegExp(keyword);
  const arr = [];
  for (let i = 0; i < list.length; i++) {
    if (reg.test(list[i][attribute])) {
      arr.push(list[i])
    }
  }
  return arr;
}





