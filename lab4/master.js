const childProcess = require('child_process')
const { fork } = childProcess

const child = fork('./child.js')

//child.send('start')

child.on('message', (msg) => {
    console.log(msg)
}).on('exit', () => {
    console.log('Child has finished sending data')
})

