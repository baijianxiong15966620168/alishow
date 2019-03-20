/* 
 *用来监听posts页面的数据变化
 */
const express = require('express');

const db = require('../../utils/db.js');

const router = express.Router();
const upload = require('../../middlewares/uploads.js');
router.get('/admin/api/posts', (req, res, next) => {
    // 开始先需要显示的数据
    db.query('select * from ali_article', (err, result) => {
        if (err) return next(err);
        res.send({
            code: 200,
            message: '查找成功',
            data: result
        });
    });
});
router.post('/api/post/add', upload.single('article_file'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    const body = req.body;
    const file = req.file;
    db.query(
        `INSERT INTO ali_article SET
        article_title=?,
        article_body=?,
        article_slug=?,
        article_file=?,
        article_cateid=?,
        article_addtime=?,
        article_status=?,
        article_adminid=?
        `, [
            body.article_title,
            body.article_body,
            body.article_slug,
            `/public/uploads/${file.filename}`,
            body.article_cateid,
            body.article_addtime,
            body.article_status,
            req.session.user.admin_id // 文章作者，也就是说当前登录用户
        ], (err, ret) => {
            if (err) {
                return next(err)
            }
            res.send({
                code: 200,
                message: '插入成功'
            })
            // 3. 发送响应
        })
});
// 监听批量删除数据
router.get('/api/posts/delete',(req,res,next)=> {
    const id = req.query.id;
    db.query(`delete  from ali_article where article_id in(${id})`,(err,result) => { 
        if(err ) return next(err);
        res.send({code:200,message:'删除成功'})
    })
})

// 监听编辑
router.get('/admin/posts/edit',(req,res,next) =>{
    const id = req.query.id;
    // console.log(id)
    db.query(`select * from ali_article where article_id=${id}`,(err,result) => { 
        // console.log(result)
        if(err) return next(err);
        res.render('admin/posts-edit.html',result[0])
    })
})

// 监听编辑完成后数据上传
router.post('/admin/api/posts/edit',(req,res,next) => { 
    const body = req.body;
    const query = req.query;
    const obj = {
        article_title:body.article_title,
        article_slug:body.article_slug,
        article_body:body.new_file || body.old_file,
        article_cateid:body.article_cateid,
        article_addtime:body.article_addtime,
        article_status:body.article_status,
        article_body:body.article_body
    }
    db.query('update ali_article set? where article_id = ?',[obj,query.id],(err,result) => {
        if(err) return next(err);
        res.send({code:200,message:'修改成功'});
    })
    // res.send({message:'ok'})
})
module.exports = router;