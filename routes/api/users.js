const express = require('express');
const router = express.Router();
const md = require('blueimp-md5');
const db = require('../../utils/db.js');
// const md =require('blueimp-md5') 
// 监听页面开始加载时需要向ali_admin请求的监听
router.get('/api/users/search',(req,res,next)=>{
    db.query('select * from ali_admin',(err,result) => { 
        // console.log(err);
        if(err) return next(err);
        res.send({code:200,message:'查询成功',data:result});
    });
});
// 监听添加请求
router.post('/api/users/add',(req,res,next)=>{
    console.log(req.body)
    // 先验证文本输入的密码和昵称是否被占用
    db.query('select * from ali_admin where admin_email = ?',req.body.admin_email,(err,result) =>{
        if(err) return next(err);
        if(!result.length == 0 ) { 
            return res.send({code:201,message:'该邮箱已被注册'})
        };
        db.query('select * from ali_admin where admin_nickname = ?',req.body.admin_nickname,(err,result) =>{
            if(err) return next(err);
            if(!result.length == 0 ) { 
                return res.send({code:201,message:'该昵称已被注册'})
            };

            // 再进行添加表单中的内容
            let obj = {
                admin_email :req.body.admin_email,
                admin_slug : req.body.admin_slug,
                admin_nickname : req.body.admin_nickname,
                admin_pwd : md(req.body.admin_password)
            };
            db.query('insert into ali_admin set?',obj,(err,result) =>{ 
                if(err ) return next(err);
                res.send({code:200,message:'添加成功'});
            })
        });
    });
});

// 异步监听用户密码是否被注册
router.get('/api/users/email',(req,res,next) => {
    console.log(req.query)
    db.query('select * from ali_admin where admin_email=?',req.query.admin_email ,(err,result) => { 
        if(err) return next(err);
        console.log(result)
        res.send(result.length === 0);
    });
});

// 监听删除用户
router.get('/api/users/delete',(req,res,next) => {
    console.log(req.query)
    db.query('delete from ali_admin where admin_id = ?',req.query.users_id,(err,result) => {
        if(err) return next(err);
        res.send({code:200,message:'删除成功'})
    });
});;

// 监听编辑请求
router.get('/api/users/edit',(req,res,next) => { 
    // console.log(req.query);
    db.query('select * from ali_admin where admin_id =?',req.query.admin_id,(err,result) =>{
        if(err) return next(err);
        res.send({code:200,message:'查找成功',data:result})
    });
});

// 监听保存修改请求监听
router.post('/api/users/change',(req,res,next) => { 
    console.log(req.query)
    console.log(req.body)
    let admin_id = req.query.admin_id;
    let obj = { 
        admin_pic : req.body.admin_pic,
        admin_email : req.body.admin_email,
        admin_slug : req.body.admin_nickname,
        admin_state : req.body.admin_state,
        admin_nickname: req.body.admin_nickname
    } ;
    db.query('update ali_admin set ? where admin_id= ?',[obj,admin_id],(err,result) => { 
        if(err) return next(err);
        res.send({code:200,message:'修改成功'});
    });
});

// 监听用户登录
router.post('/api/users/check/login',(req,res,next) => { 
    // console.log(req.body);
    db.query('select * from ali_admin where admin_email =?',req.body.admin_email,(err,result) => { 
        // console.log(result)
        if(err) return next(err);
        if(result.length == 0) { 
            return res.send({code:201,messages:'邮箱或者密码错误'});
        };
        if(result[0].admin_pwd !== md(req.body.admin_pwd)) { 
            return res.send({code:201,messages:'密码或者邮箱错误'});
        };
        req.session.user= result[0];
        return res.send({ code:200,messages:'密码和邮箱都正确'});
    });
});

// 监听用户退出登录
router.get('/admin/users/logout',(req,res,result) => { 
    // 删除session信息
    delete req.session.user
    // 返回到登录页
    res.redirect('/admin/login')
})
module.exports = router;