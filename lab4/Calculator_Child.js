const rxjs=require('rxjs')
const operators=require('rxjs/operators')

const {from}=rxjs
const {reduce}=operators

process.on('message', (data) => {

    const arr=from(data)

    let ans=0

    arr.pipe(
        reduce((a,b)=>a+b)
    ).subscribe((val)=>{
        ans=val
    })
   
    process.send(ans)

    process.exit()
})

   