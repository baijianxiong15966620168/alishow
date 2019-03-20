const fs = require('fs');

// 第一步：封装一个函数
function file(fPath) { 
    // 创建一个promise对象
   return new Promise(function(resolve,reject){
        // 执行异步代码
        fs.readFile(fPath,(err,result) =>{ 
            // 成功就返回结果，失败就执行reject
            if(err) {
                reject(err);
            }else{
                resolve(result);
            }
        })
     })
}

file('./a.txt')
.then((data)=>{
    console.log(data.toString())
    return file('./b.txt');
})
.then((data)=> { 
    console.log(data.toString());
    return file('./c.txt');
})
.then((data) => { 
    console.log(data.toString());
})

