const http = require('http')
const ChildProcess = require('child_process')

const { fork } = ChildProcess

const child = fork('./calculator.js')

child.on('message', (msg) => {
    console.log(msg)
})

child.send('this is the message sent')


