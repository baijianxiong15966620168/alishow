const express = require('express');
//创建一个服务器
const app = express();
app.use(express.urlencoded());
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
//监听的主页路由
const indexRouter = require('./routes/index.js');
//监听管理系统视图
const adminRouter = require('./routes/admin.js');
// 监听分类目录的操作
const categoriesRouter = require('./routes/api/categories.js');
// post页面的监听
const postsRouter = require('./routes/api/posts.js');
//监听users的修改监听
const usersRouter = require('./routes/api/users.js');
// 监听common的监听
const commomRouter = require('./routes/api/common.js');
const checkLogin = require('./middlewares/checklogin');
const listRouter = require('./routes/api/list.js');
//加载的template模块
const template = require('express-art-template');
//开启服务器
app.listen(3000,()=>{
    console.log('running...');
});

app.use('/assets',express.static('./public/assets'));

app.use('/uploads',express.static('./public/uploads'));

app.use('/public',express.static('./public'));

app.use('/admin/assets',express.static('./public/assets'));

app.use('/admin/uploads',express.static('./public/uploads'));

app.use('/admin/public',express.static('./public'));
app.use('/jquerypage',express.static('./jquerypage'))

// app.use('/admin/public/upload',express.static('./public'));


app.use('/node_modules',express.static('./node_modules'));

// 输出错误信息
app.use((err,req,res,next)=>{
    res.status(500).send({
        error:err.message,
    });
});
let options = {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'alishow'
};
let sessionStore = new MySQLStore(options);
// 配置让session持久化
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
}));
// 检查是否是登录状态
app.use('/admin',checkLogin,(req,res,next) => { 
    // 用locals对象保存了session信息，在页面中可以直接使用这个对象下面定义的值
    app.locals.sessionUser = req.session.user;
    next();
})

app.use(indexRouter);
app.use(adminRouter);
app.use(categoriesRouter);
app.use(postsRouter);
app.use(usersRouter);
app.use(commomRouter);
app.use(listRouter);

app.engine('html',template);
