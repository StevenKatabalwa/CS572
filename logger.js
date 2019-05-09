const EventEmitter = require('events')

class Logger extends EventEmitter {

    constructor() {
        super()
    }

    log(message) {

        this.on('logme', (message) => {
            console.log(message)
        })

        this.emit('logme', message)
    }

}

module.exports=Logger