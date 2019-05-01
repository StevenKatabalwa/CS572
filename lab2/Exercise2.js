
Array.prototype.even = function () {
    const func = (async () => {
        return this.filter(x => (x % 2) == 0)
    })().then(console.log)
}

Array.prototype.odd = function () {
    const func = (async () => {
        return this.filter(x => (x % 2) == 1)
    })().then(console.log)
}

console.log('start')

const a = [1, 2, 3, 4, 5, 6, 7, 8]
const b = [1, 2, 3, 4, 5, 6, 7, 8]

a.even()
b.odd()

console.log('end')