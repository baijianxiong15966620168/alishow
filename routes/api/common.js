const express = require('express');

const router = express.Router();
const upload = require('../../middlewares/uploads.js');
router.post('/api/post/upload',upload.single('file'),(req,res,next) =>{ 
    
    const {file} = req;
    // console.log(file)
    // console.log(res)
    res.status(200).json({
        // errno 即错误代码，0 表示没有错误。
        //       如果有错误，errno != 0，可通过下文中的监听函数 fail 拿到该错误码进行自定义处理
        "errno": 0,
    
        // data 是一个数组，返回若干图片的线上地址

        "data": [
            `/public/uploads/${file.filename}`,
        ]
    })
})
module.exports = router;