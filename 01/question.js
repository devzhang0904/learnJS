// const promise = new Promise((resolve, reject) => {
//   console.log(1)
//   resolve()
//   console.log(2)
// })
//
// promise.then(() => {
//   console.log(3)
// })
//
// console.log(4)
//

const first = () => (new Promise((resolve, reject) => {
  console.log(3)

  let p = new Promise((resolve, reject) => {
    console.log(7)
    setTimeout(() => {
      console.log(5)
      resolve(6)
    }, 0)
    resolve(1);
  })

  resolve(2)

  p.then(arg => {
    console.log(arg)
  })
}))

first().then(arg => {
  console.log(arg)
})
console.log(4)











