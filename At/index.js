Array.prototype.At = function (n){
    const _t = this

    n = Math.trunc(n) || 0

    if(n < 0) n += _t.length

    if(n < 0 || n > _t.length) return undefined

    return this[n]
}

const numbers = [1,2,3,4,5]

console.log(numbers.At(-1))
console.log(numbers[numbers.length - 1])
