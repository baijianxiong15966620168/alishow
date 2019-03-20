// function timeout(ms) { 
//     return new Promise(function(resolve,reject){
//         setTimeout(resolve,ms,'done');
//     })
// }


// timeout(1000).then((result) =>{
//     console.log(result);//这里会在一秒后输出done
// })

const someAsyncThing = function() { 
    return new Promise(function(resolve,reject){
        resolve(x + 2);
    })
};

someAsyncThing().then(()=>{
    console.log('everything is great');
});
process.on('unhandledRejection',(err,p)=>{
    console.log(err);
})

setTimeout(() => {
    console.log(123)
}, 2000);

