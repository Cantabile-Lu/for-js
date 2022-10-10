
Function.prototype.Apply = function(thisArg, argArray){
    /**
     * save this
     * the function it's before  Apply
     */
    const _t = this
    // if thisArg not empty . create new object otherwise window / globalThis
    thisArg = (thisArg !== undefined && thisArg !== null ) ? Object(thisArg) : globalThis
    thisArg.fn = _t
    const result = thisArg.fn(...argArray || [])
    delete thisArg.fn
    return result
}

function sum(n1, n2){
    return n1 + n2
}

const result1 = sum.Apply({}, [2,3])
console.log(result1) // 5

const result2 = sum.apply({}, [2,3])
console.log(result2) // 5

const numbers = [1,2,3,4,5,6]
const max = Math.max.Apply(null, numbers);
console.log(max);
