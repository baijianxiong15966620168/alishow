/* 
开启的是主页面的路由监听
*/
const express = require('express');

const router = express.Router();
router.get('/index',(req,res)=>{
    res.render('index.html');
});
router.get('/list',(req,res) => { 
    res.render('list.html')
})
module.exports = router;

