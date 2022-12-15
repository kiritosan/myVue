import Render from './render.js'
// import second from './proxy.js'

const obj = {
  tag: 'div',
  children: [
    {tag: 'span', children: 'hello world111ssss222'}
  ]
}

Render(obj, document.getElementById('root'))


let activeEffect

function effect(fn) {
  activeEffect = fn
  fn()
}

const bucket = new Set()

const data = {text: 'Hello World!'}

const objProxy = new Proxy(data, {
  get(target, key){
    bucket.add(activeEffect)
    return target[key]
  },
  set(target, key, newVal) {
    target[key] = newVal
    bucket.forEach(fn =>  fn())
    return true
  }
});

effect((params) => {
  document.body.innerHTML = objProxy.text
})

setTimeout(()=>{
  objProxy.text = 'Hello World! Hello World! ###'
}, 1000)

setTimeout(()=>{
  objProxy.aaaa = 'namuuuuuu'
}, 2000)
