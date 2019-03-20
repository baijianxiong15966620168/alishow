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
//1先创建一个promise对象，里面时一个回调函数，resolve是成功之后调用的参数，reject是失败之后调用的参数
//2在对象的回调函数里面写需要执行的异步代码，只要是返回的resolve既可以后面执行then方法
//3、只要每次返回的是一个promise对象，那么后面就可以使用then方法来接受返回resolve或者reject返回的数据

time(1000)
    .then(()=>{
        console.log('1秒到了');
        return file('./a.txt');
    })
    .then((data) =>{ 
        console.log(data.toString());
        return time(2000);
    })
    .then(()=>{
        console.log('2秒到了');
        return file('./b.txt');
    })
    .then((data)=>{
        console.log(data.toString());
        return time(3000);
    })
    .then(()=>{
        console.log('3秒到了');
        return file('./c.txt');
    })
    .then((data) => { 
        console.log(data.toString());
    })
    .catch((err)=>{
        console.log(err)
    })