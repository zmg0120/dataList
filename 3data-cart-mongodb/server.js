// 引入carp 框架；
var carp = require('./lib/carp');

// 引入 controllers中的TODO 类 （逻辑处理）
var All = require("./controllers/all");
var AddPost = require("./controllers/addPost");
var Modify = require("./controllers/modify");

// 创建carp实例对象
var app = new carp("testApp");

// 设置静态资源处理类
app.useStatic(carp.Static, __dirname);
// 设置静态资源目录
app.setStatic("/static/");

// 设置路由及处理函数
app.add("/all", All);
app.add("/add", AddPost);
app.add("/modify", Modify);


app.listen(8000);

