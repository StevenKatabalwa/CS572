const dns = require('dns')
const {Resolver}=dns.promises

dns.resolve4('www.mum.edu', (err, addr) => {
    console.log(addr)
})

//Convert Callback function to a promise object
const resolve4 = (hostname) => {
    return new Promise((res, rej) => {
        dns.resolve4(hostname, (err, addr) => {
            res(addr)
            rej(err)
        })
    })
}
resolve4('www.mum.edu').then(console.log)

//Convert Callback function to an async/await object
const resolver=new Resolver()

const resolve4Async = async function (hostname) {

    return await resolver.resolve4(hostname)
}

resolve4Async('www.mum.edu').then(console.log)