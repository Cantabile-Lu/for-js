
Array.prototype.Slice = function (begin, end){
    end = (typeof end !== 'undefined') ? end : this.length

    let i, cloned = [];
    let size, len = this.length;

    let start = begin || 0;
    start = (start >= 0 ) ? start : Math.max(0, len + start)

    // 获取最小值或者数组的长度
    let upTo = (typeof  end === 'number') ? Math.min(end,len) : len

    if(end < 0){
        upTo += len + end
    }

    size  = upTo - start

    if(size > 0){
        cloned = new Array(size)
        for ( i = 0; i < size; i++ ){
            cloned[i] = this[start + i]
        }
    }
    return cloned
}

const numbers = [1,2,3,4,5]
const result1 = numbers.Slice(1, 3)
const result2 = numbers.slice(1, 3)
console.log("->19:index.js", result1);
console.log("->19:index.js", result2);
