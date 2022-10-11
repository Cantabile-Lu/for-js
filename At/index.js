Array.prototype.At = function (index){
    /**
     * save this
     * [].At(3) -> this = []
     */
    const _t = this

    index = Math.trunc(index)

    if(index < 0) index += _t.length

    if(index < 0 || index >= _t.length) return undefined

    return this[index]
}

const numbers = [1,2,3,4,5]

console.log(numbers.At(-1))
console.log(numbers[numbers.length - 1])
