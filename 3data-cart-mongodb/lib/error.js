const error = {
  "400": {
    code: 400,
    resType: "text/html;charset=utf-8",
    message: "<h1>请求错误</h1>"
  },

  "401": {
    code: 401,
    resType: "text/html;charset=utf-8",
    message: "<h1>没有验证信息</h1>"
  },
  "404": {
    code: 404,
    resType: "text/html;charset=utf-8",
    message: "<h1>页面找不到</h1>"
  },
  "500": {
    code: 500,
    resType: "text/html;charset=utf-8",
    message: "<h1>服务器错误</h1>"
  },
  "method": {
    code: 400,
    resType: "text/html;charset=utf-8",
    message: "<h1>请求的method 不被支持</h1>"
  },
  "fileError": {
    code: 404,
    resType: "text/html;charset=utf-8",
    message: "<h1>请求的文件不存在</h1>"
  }
}

module.exports = error;
