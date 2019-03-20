const fs = require('fs');

const p = new Promise(function(resolve,reject) { 
    fs.readFile('./a.txt',(err,result) => { 
        if(err){
            reject(err);
        }else{
            resolve(result)
        }
    })
});
p.then((data) => { 
    console.log(data.toString());
},(err) => { 
    console.log(err)
})