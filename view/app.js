const fs = require('fs');


setTimeout(function() { 
    fs.readFile('./a.txt',(err,result) => {
        if(err) return console.log(err);
        console.log(result.toString());
    })
    setTimeout(function() { 
        fs.readFile('./b.txt',(err,result) => { 
            if(err) return console.log(err);
            console.log(result.toString());
        });
        setTimeout(function() { 
            fs.readFile('./c.txt',(err,result) => { 
                if(err) return console.log(err);
                console.log(result.toString());
            })
        },3000)       
    },2000)
},1000)