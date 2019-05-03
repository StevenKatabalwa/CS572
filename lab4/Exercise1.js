const os = require('os')
const rxjs = require('rxjs')

function checkSystem() {

    console.log('Checking your system...')

    let memoryMsg = os.totalmem()/1000000000 >= 4 || "This app needs at least 4 GB of RAM"
    memoryMsg = `Memory: ${memoryMsg}`

    let processorMsg = os.cpus().length >= 2 || "Processor is not Supported"
    processorMsg = `Processor: ${processorMsg}`

    if (!memoryMsg) {
        console.log(memoryMsg)
    }

    else if (!processorMsg) {
        console.log(processorMsg)
    }

    else {
        console.log('System is checked successfully')
    }
}

const { Observable } = rxjs

const observable = Observable.create((observer) => {
    checkSystem()
})

observable.subscribe()
