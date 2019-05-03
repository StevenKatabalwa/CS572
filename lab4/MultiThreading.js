const http = require('http')
const ChildProcess = require('child_process')

const { fork } = ChildProcess

const child = fork('./calculator.js')

child.send([1,2,3,4,5,6,7,8])

child.on('message',(msg) => {
    
   console.log(msg)
})


