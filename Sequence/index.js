/**
 * @description: 最长递增子序列
 */

const nums = [2,1,5,3]//,6,4,8,9,7

function Sequence(arr){
    // 保存arr副本
    const p = arr.slice()
    const result = [0];
    let i, j, u, v , c;
    // 数组长度
    let len = arr.length;
    for(i = 0; i < len; i++){
        // 取出数组每项
        const arrI = arr[i]
        // 排除0 的情况
        if(arrI !== 0){
            // result存储的是长度为i的递增子序列最小末尾值的索引
            j =  result[result.length - 1]
            // console.log(result[result.length - 1], result.at(-1))
            /**
             * 程序执行第一次, j = 0 , arr[j] = 2 , arrI = 2
             */
            // console.log(j, arr[j], arrI)
            if(arr[j] < arrI){
                // console.log('程序走到了这里', arr[j])
                p[i] = j
                result.push(i)
                continue
            }
            // 不满足条件, 进行二分搜索
            // u = 0
            // v = result.length - 1
            // // 查找第一个比arrI小的数, 更新result的值
            // while(u  < v){
            //
            // }
        }
    }

}
Sequence(nums)
