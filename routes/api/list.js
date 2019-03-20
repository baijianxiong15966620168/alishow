const express = require('express');
const db = require('../../utils/db.js')
const router = express.Router();
router.get('/list/onload',(req,res,next) => { 
    // console.log(req.query)
    const query = req.query;
    let pageNum = Number.parseInt(query.pageNum || 1);//需要展示的页数
    let pageSize = Number.parseInt(query.pageSize || 5);//每页需要展示的数量
    db.query('select * from ali_article limit ?,?',[(pageNum-1)*pageSize,pageSize],(err,result) => { 
        if(err) return next(err);
        // console.log(result)
        // res.send({code:200,message:'查找成功',data:result})
        db.query('SELECT COUNT(*) as count from `ali_article`',(err,ret) =>{ 
            if(err) return next(err);
            res.send({code:200,data:result,total:ret[0].count});
        })
    })
})
module.exports = router;