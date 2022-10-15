
Array.prototype.Flat = function (depth = 1){
    if(!Number(depth) || Number(depth) < 0){
        return this
    }

    let newArr = []
    this.forEach(item => {
        if(Array.isArray(item)){
            newArr = newArr.concat(item.Flat(--depth))
        }else {
            newArr.push(item)
        }
    })
    return newArr
}

var arr1 = [1, 2, ,,[3, 4]];
console.log(arr1.Flat())

var arr2 = [1, 2, [3, 4, [5, 6]]];
console.log(arr2.Flat())

var arr3 = [1, 2, [3, 4, [5, 6]]];
console.log(arr3.flat(3))

var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
console.log(arr4.flat(Infinity))

