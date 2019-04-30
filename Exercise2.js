const rxjs=require('rxjs')
const operators=require('rxjs/operators')

const {of,from,Observable}=rxjs
const {filter, map}=operators

const date=new Date()
const day=date.getDay()


const findWeekDay=(day)=>{

    return new Promise((resolve,reject)=>{

        const data=Observable.create((x)=>{
            x.next(day)
            x.complete()
        })

        data.pipe(
            filter(d=>d==0||d==6)
            ,map(d=>'Weekend')
        ).subscribe(x=>resolve(x))

        data.pipe(
            filter(d=>d>0&&d<=6)
            ,map(d=>'Weekday')
        ).subscribe(x=>reject(x))

    })
}

findWeekDay(day).then((d)=>console.log(d),(d)=>console.log(d))

