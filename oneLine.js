// 去除数组重复项
const uniqueArr = (arr) => [...new Set(arr)];
// console.log(uniqueArr([12,12,12,23,22,23,24]))

// 判断对象是否为空{}
const isEmpty = obj => Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;

// 反转字符串
const reverse = str => str.split('').reverse().join('');
// console.log(reverse('hello ccyou'))

// 生成随机十六进制
const randomHexColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0')}`
// console.log(randomHexColor())

// 查询某天是否为工作日
const isWeekday = (date) => date.getDay() % 6 !== 0;
// console.log(isWeekday(new Date(2019, 4, 24)))

// 两个日期之间相差的天数
const dayDiff = (date1, date2) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);
// console.log(dayDiff(new Date(), new Date('2021-03-23')))

// 计算数组平均值
const average = (arr) => arr.reduce((a, b) => a + b) / arr.length;
// console.log(average([10, 202, 230, 30, 40, 50, 60, 70, 80, 90]))

console.log('weizhi' >= 0)












