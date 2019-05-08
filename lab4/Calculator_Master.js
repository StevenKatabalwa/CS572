const http = require('http')
const ChildProcess = require('child_process')

const { fork } = ChildProcess

const child = fork('./Calculator_Child.js')

child.send([1,2,3,4,5,6,7,8])

child.on('message',(msg) => {    
   console.log(`The sum is: ${msg}`)
}).on('exit',()=>console.log('End of calculation'))


