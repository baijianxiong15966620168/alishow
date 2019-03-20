/* 
用来监听admin管理系统下的路由页面
*/
const express = require('express');

const router = express.Router();


//加载绝对路径的模块
const path = require('path');

router.get('/admin',(req,res)=>{
    // console.log(req.session.user);
    res.render('admin/index.html');
});

// 监听显示分类目录
router.get('/admin/categories',(req,res)=>{
    res.render('admin/categories.html');
});

//监听显示posts页面
router.get('/admin/posts',(req,res) => {
    res.render('admin/posts.html');
});
router.get('/admin/users',(req,res)=>{
    res.render('admin/users.html')
});
router.get('/admin/login',(req,res) => { 
    res.render('admin/login.html')
})
router.get('/admin/postadd',(req,res)=>{
    res.render('admin/post-add.html')
})
module.exports = router;