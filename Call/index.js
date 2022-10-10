
Function.prototype.Call = function(thisArg, ...args){
    /**
     * save this
     *  the function it's before Call
     */
    const _t = this
    // if thisArg not empty . create new object otherwise window / globalThis
    thisArg = (thisArg !== undefined && thisArg !== null ) ? Object(thisArg) : globalThis
    thisArg.fn = _t
    const result = thisArg.fn(...args)

    // remove excess function
    delete thisArg.fn
    return result
}
function sum(n1, n2){
    return n1 + n2
}
const result1 = sum.Call('Call', 2,3)
console.log(result1) // 5

const result2 = sum.call('call', 2,3)
console.log(result2) // 5

var sData = 'Wisen';
function result3() {
    console.log('sData value is %s ', this.sData);
}
result3.Call();
function result4() {
    console.log('sData value is %s ', this.sData);
}
result4.call();
