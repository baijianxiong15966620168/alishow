const fs = require('fs');

function file(fPath) { 
    return new Promise(function(resolve,reject){
        fs.readFile(fPath,(err,result)=>{
            err?reject(err):resolve(result);
        })
    })
}

function time(time) { 
    return new Promise(function(resolve,reject){ 
        setTimeout(function() {
            resolve();
        },time)
    })
}


// 异步美化promise对象的执行步骤
//这里需要使用async来调用await来等待每步函数的执行 
async function main() { 
    await time(1000);
    const a = await file('./a.txt');
    console.log(a.toString());
    await time(2000);
    const b = await file('./b.txt');
    console.log(b.toString());
    await time(3000);
    const c = await file('./c.txt');
    console.log(c.toString())
}
main();