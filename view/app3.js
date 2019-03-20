function time(time) {
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve();
        },time)
    })
}

time(1000)
    .then(()=>{
        console.log('1秒到了')
        return time(2000);
    })
    .then(()=>{
        console.log('2秒到了')
        return time(3000);
    })
    .then(() => { 
        console.log('3秒到了');
    })