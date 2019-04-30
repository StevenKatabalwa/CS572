const rxjs = require('rxjs')
const operators = require('rxjs/operators')

const { of, from, Observable } = rxjs
const { filter, map } = operators

const date = new Date()
const day = date.getDay()


//Approach using Data Structure (Arrays with finite size and random accessibility)
const findOutPeriod = (day) => {

    const [we, wd] = ["Weekend", "Weekday"]

    const periods = [we, wd, wd, wd, wd, we, we]

    return new Promise((resolve, reject) => {

        resolve(periods[day])

        reject("Day does not exist")

    }).then(console.log)
}

findOutPeriod(day)


/*Alternative approach using a promise and an observable:
 Comparator involved likely to use if-else implementations.*/
 const findWeekDay = ((day) => {

    return new Promise((resolve, reject) => {

        const data = Observable.create((x) => {
            x.next(day)
            x.complete()
        })

        data.pipe(
            filter(d => d == 0 || d == 6)
            , map(d => 'Weekend')
        ).subscribe(x => resolve(x))

        data.pipe(
            filter(d => d > 0 && d <= 6)
            , map(d => 'Weekday')
        ).subscribe(x => reject(x))

    })
})(day).then((d) => console.log(d), (d) => console.log(d))