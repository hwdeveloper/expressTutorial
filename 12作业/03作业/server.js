var express = require('express');
var app = express();

app.use(express.static('public'));
//指定模板引擎
app.set("views engine", 'ejs');
//指定模板位置
app.set('views', __dirname + '/views');

var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));

app.get('/index', function (req, res) {
    res.render('index', {}
    );
})

app.post('/indexLogin',urlencodedParser, function (req, res) {
     //1,获得用户请求的post数据
    var username =req.body.username;
    var password = req.body.password;
    //2,引入UserDao
    var UserDao = require('./dao/UserDao');
    var userDao =  new UserDao();
    //3, 验证用户名和密码是否合法
    userDao.verification(username,password,function(result){

        if(result==0){
            console.log("用户不存在");
        }else if(result==1){
            console.log("密码错误");
        }else{
            console.log("密码正确");
        }

       /* if(result){
            res.render('index', {}
            );
        }else{
            res.render('login', {msg:'密码错了'}
            );
        }*/

    });

})

app.post('/process_post', urlencodedParser, function (req, res) {


    var name =req.body.first_name;
    var last_name = req.body.last_name;

    res.write(name+":"+last_name);
    res.end();
})


app.get('/login', function (req, res) {
    res.render('login', {}
    );
})

app.get('/form_component', function (req, res) {
    res.render('form_component', {}
    );
})

app.get('/form_validation', function (req, res) {
    res.render('form_validation', {}
    );
})




var server = app.listen(8088)