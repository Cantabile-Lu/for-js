/**
 * @description: 分时函数
 * @params ary: 要分片的集合
 * @params fn: 要执行的函数
 * @params count: 个批次加载的数组元素数量。
 * @params time: 每个批次之间的时间间隔（
 */
const chunk = (ary, fn, count, time = 100) => {
    let t = null
    // 根据count 将ary 中的每一项依次取出执行fn, 直到ary长度为0
    const start = function () {
        for (let i = 0; i < Math.min(count || 1, ary.length); i++) {
            const aryItem = ary.shift();
            fn(aryItem)
        }
    }
    return function (){
        t = setInterval(function (){
            if(ary.length === 0){
                return clearInterval(t)
            }
            start()
        }, time)
    }
}


// test

const btn = document.getElementById('btn')
btn.onclick =  function timeTest2() {
    const wrap = document.getElementById('wrap')
    const ary = new Array(100000).fill(0).map((_,i) => i)
       console.log("-> ary", ary);
    // 创建dom节点并插入到id为wrap的元素中
    const createEle = (text) => {
        const div = document.createElement('div')
        div.innerHTML = text
        wrap.appendChild(div)
    }
    const renderList = chunk(ary, createEle, 100, 16)
    renderList()
}
