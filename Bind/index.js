
Function.prototype.Bind = function (thisArgs, ...args){
    const _t = this
    thisArgs = (thisArgs !== undefined && thisArgs !== null) ? Object(thisArgs) : globalThis
    return function (...params){
        thisArgs.fn = _t
        const result = thisArgs.fn(...args,...params)
        delete thisArgs.fn
        return result
    }
}
const position = {
    x: 42,
    getX: function() {
        return this.x;
    }
};
const unboundGetX = position.getX;
console.log(unboundGetX()); // undefined

const boundGetX = unboundGetX.bind(position);
console.log(boundGetX()); // 42

const boundGetX1 = unboundGetX.Bind(position);
console.log(boundGetX1()); // 42


