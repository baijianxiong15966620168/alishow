/* 
*用来监听分类目录的数据更换操作
*/
const express = require('express');

const router = express.Router();

const db = require('../../utils/db.js');

//页面加载时，查找初始化数据，渲染页面
router.get('/api/categories',(req,res,next)=>{
    db.query('select * from ali_cate',(err,result)=>{
        if(err) return next(err);
        res.send({code:200,message:'查找成功',data:result});
    });
});
// 监听删除按钮
router.get('/api/categories/delete',(req,res,next)=>{
    // 编写SQL语句
    let sql = `delete from ali_cate where cate_id=?`;
    // 执行sql语句
    db.query(sql,req.query.id,(err,result) => {
        if(err) return next(err);
        res.send({code:201,message:'删除成功'})
    });
});

// 监听增加数据
router.post('/api/categories/add',(req,res,next) =>{
    let obj = {
        cate_name : req.body.name,
        cate_slug : req.body.slug
    };
    db.query('insert into ali_cate set ?',obj,(err,result) => { 
        if(err) return next(err);
        res.send({code:200,message:'添加成功'});
    });
});

// 监听编辑按钮
router.get('/api/categories/search',(req,res,next) => {
    // console.log(req.query);
    db.query('select * from ali_cate where cate_id=?',[req.query.id],(err,result) => {
        if(err) return next(err);
        res.send({code:200,message:'查找成功',data:result[0]});
    });
});

// 监听保存修改
router.post('/api/categories/update',(req,res,next) => { 
    let obj = {
        cate_name:req.body.cate_name,
        cate_slug:req.body.cate_slug,
    }
    db.query('update ali_cate set ? where cate_id=?',[obj,req.query.id],(err,result) => { 
        if(err) return next(err);
        res.send({code:200,message:'更改成功'})
    });
});
// 页面打开的时候发送一个请求，去后端查找并将数据渲染到页面
module.exports = router;