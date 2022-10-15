/**
 * 规范 : https://promisesaplus.com/
 */
const STATUS_PENDING = 'pending'
const STATUS_RESOLVE = 'fulfilled'
const STATUS_REJECT = 'rejected'

function execFuncWithCatchError(executor, value, resolve, reject){
    try{
        const result = executor(value)
        resolve(result)
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

    // method then function
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

    // Resolve
    static resolve(value){
        return new promise(resolve => resolve(value))
    }
    // reject
    static reject(reason){
        return new promise(reject => reject(reason))
    }
}


const p1 = new promise((resolve,reject) => {
    // reject('reject来了')
    resolve('resolve来了')
})
p1.then(res => {
    console.log(res)
    return res + '!!!'
}).then(res1 => {
    console.log(res1)
})

