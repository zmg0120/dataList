# dataList
通过前后端数据交互，实现对数据的增删改查 

0 saveData 
#实现功能：提交post表单信息，通过发ajax向后台发送POST请求，并将数据写入文件
#node testserver.js 启动后台服务程序，监听在本地8000端口
#在地址栏输入 http://localhost:8000/add 请求增加数据页面 
#在请求页面的表单里填写相应的数据，点击提交
#服务端返回提交数据后的页面展示

1saveData-swig
#在上面0 saveData的基础上引入 
#mine用来处理路径 swig模板引擎进行渲染前端页面

2saveData-carp
#在1saveData-swig的基础上引入自定义carp框架 
#使路由功能更加简单

3data-cart-mongodb
#在2的基础上进行改进，将数据存入数据库，并通过前端页面对数据库进行增删改查的操作