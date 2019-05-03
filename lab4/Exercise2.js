const cluster = require('cluster')
const os = require('os')
const url = require('url')
const http = require('http')
const fs = require('fs')
const util = require('util')

//using cluster and load balancer
if (cluster.isMaster) {

    for (let i = 0; i <= os.cpus().length; i++) {

        cluster.fork()
    }
}

else {

    http.createServer((req, res) => {

        const u = url.parse(req.url)

        const [a, b] = u.path.split("=")

        const exists = fileExists(`./${b}`)

        exists.then(() => {

            const file = fs.createReadStream(`./${b}`)

            file.on('data', (data) => {

                console.log(data)
                res.write(data)

            }).on('end', () => {

                res.end()

            })

        }, () => {
            console.log('File did not exist, just created one')
            fs.writeFile(`./${b}`, "This is the data written to the file", () => { })
        })


    }).listen(5000, 'localhost').on('listening', () => {
        console.log('Server is listening')
        console.log('Process: ' + process.pid)
    })
}

const fileExists = (file) => {

    let result = false

    return new Promise((res,rej)=>{

     fs.existsSync(file, (rss) => {
        result = rss
    })
    
    if(result) res(result)

    else rej(result)
})
}
