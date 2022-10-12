/**
 * 规范 : https://promisesaplus.com/
 */
const STATUS_PENDING = 'pending'
const STATUS_RESOLVE = 'fulfilled'
const STATUS_REJECT = 'rejected'

function execFuncWithCatchError(executor, value, resolve, reject){
    try{
        const result = executor(value)
        resolve(value)
    }catch (error){
        reject(error)
    }
}

class promise {
    constructor(executor) {
        // 初始化为pending状态
        this.status = STATUS_PENDING

        this.value = undefined

        this.reason = undefined

        // 集合
        this.onFulfilledFuns = []
        this.onRejectedFunc = []
        const resolve = (value) => {
            // 如果是pending状态, 则 修改状态为 fulfilled
            if(this.status === STATUS_PENDING){
                queueMicrotask(() => {
                    if(this.status !== STATUS_PENDING) return;
                    this.status = STATUS_RESOLVE

                    this.value = value

                    this.onFulfilledFuns.forEach(fn => {
                        fn(this.value)
                    })
                })
            }
        }

        const reject = (reason) => {
            if(this.status === STATUS_PENDING){
                queueMicrotask(() => {
                    if(this.status !== STATUS_PENDING) return ;
                    this.reason = reason
                    this.status = STATUS_REJECT

                    this.onRejectedFunc.forEach(fn => {
                        fn(this.reason)
                    })
                })
            }
        }

        try{
            executor(resolve, reject)
        }catch (err){
            reject(err)
        }
    }
    then(onFulfilled, onRejected){
        onFulfilled = onFulfilled || ((value) => value)
        onRejected = onRejected || ((err) => {throw err})

        return new promise((resolve, reject) => {
            if(this.status === STATUS_RESOLVE && onFulfilled){
                execFuncWithCatchError(onFulfilled, this.value, resolve, reject)
            }

            if(this.status === STATUS_REJECT && onRejected){
                execFuncWithCatchError(onRejected, this.reason, resolve, reject)
            }

            if(this.status === STATUS_PENDING){
               if(onFulfilled) this.onFulfilledFuns.push(() => {
                   execFuncWithCatchError(onFulfilled, this.value, resolve, reject)
               })

                if(onRejected) this.onRejectedFunc.push(() => {
                    execFuncWithCatchError(onRejected, this.reason, resolve,reject)
                })
            }
        })

    }
}


const p1 = new promise((resolve,reject) => {
    // reject('reject来了')
    resolve('resolve来了')
}).then(res => {
    console.log(res)
},err => {
    console.log(err)
})
// console.log(p1, 'p1')
// const p2 = new Promise((resolve,reject) => {
//     resolve('resolve来了')
// }).then(res => {
//     console.log(res, 'Promise')
// })
// console.log(p2, 'p2')
