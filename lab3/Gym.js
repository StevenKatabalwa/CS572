const EventEmitter = require('events')

class Gym extends EventEmitter {

    constructor() {

        super()

        setInterval(() => {
            this.emit('boom', "Athlete is working out")
        }, 1000)
    }
}

module.exports = Gym