const bucket = new Set()

const data = {text: 'Hello World!'}

const obj = new proxy(data, {
  get(target, key){
    bucket.add(effect)
    return target['key']
  },
  set(target, key, newVal) {
    target[key] = newVal
    bucket.forEach(fn =>  fn())
    return true
  }
});


function effect(){
  document.body.innerText = obj.text
}

effect()

setTimeout(()=>{
  obj.text = 'Hello World! Hello World! ###'
}, 1000)