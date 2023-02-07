

function calcStr(str){
    let arr = [...str]
    let map = new Map()
    for (let i = 0; i < arr.length; i++){
        if(map.has(arr[i])){
            map.set(arr[i], map.get(arr[i] ) + 1)
        }else{
            map.set(arr[i],1)
        }
    }
    let nums = []
    for (const mapElement of map) {
        let [str, num] = mapElement
        nums.push({label: str, value: num})
    }
    nums.sort((v1,v2) => {
        if(v1.value > v2.value){
            return 1
        } else if(v1.value < v2.value){
            return -1
        }else{
            return 0
        }
    })

    return nums.pop()

}

const target = calcStr('gjfkfdhafjehwhfjfhhfhfhfhfhf')
// console.log("->33:index.js", target);


let strs = ['a','b','c','d'
    , 'e','f','g']
function calcLeng (){
    let num = 0;
    let newArr = []
    for(let i = 0; i < strs.length; i ++ ){
        if(num === strs.length){
            newArr.push(strs[i])
            console.log(newArr)
        }else{
            console.log('程序进行到这里')
        }
    }
}

calcLeng()

