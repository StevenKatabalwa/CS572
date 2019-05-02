const EventEmitter = require('events')

class Button extends EventEmitter {

    label = 'button label'
    
    click() {

        this.on('click', (args) => {
            console.log(args)
        })

        this.emit('click', { label: this.label, 'page-x': 100, 'page-y': 100 })
    }
}

const btn = new Button();

btn.click()


//How Do streams and events work together
/*
 * Streams are event emitters, when a stream receives data,
 * it invokes the overriden on method from events module
 *
 */