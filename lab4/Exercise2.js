const cluster = require('cluster')
const os = require('os')
const url = require('url')
const http = require('http')
const fs = require('fs')

const { fork } = process

//using cluster and load balancer
if (cluster.isMaster) {

    for (let i = 0; i <= os.cpus().length; i++) {

        cluster.fork()
    }
}

else {

    http.createServer((req, res) => {

        const u = url.parse(req.url, true)

        const { path } = u.query

        const exists = fileExists(path)

        exists.then(() => {

            const file = fs.createReadStream(`./${path}`)

            file.on('data', (data) => {

                console.log(data)
                res.write(data)
            

            }).on('end', () => {

                res.end()

            })

        }, (err) => {

            console.log('File did not exist, just created one')
            fs.writeFile(path,'This is the data written to the file',(err)=>{console.log})
            res.write('File did not exist, just created one')
            res.end()
        })


    }).listen(5000, 'localhost').on('listening', () => {
        console.log('Server is listening')
        console.log('Process: ' + process.pid)
    })
}

const fileExists = (file) => {

    let result

    return new Promise((res, rej) => {

        result = fs.existsSync(file)
   
        if (result) { res(result) }

        else { rej(result) }
    })
}
