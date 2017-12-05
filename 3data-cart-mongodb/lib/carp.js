var http = require("http");
var events = require("events");
var url = require("url");
var err = require("./error.js");
var Controller = require("./Controller");
var Static = require("./Static");

class carp extends events.EventEmitter{
  constructor(name) {
    super();
    this.name = name || "CarpHttp";
    this.debug = true;
    this.routerList = [];
    this.on("error", (code, res) => {
      this._error(code, res);
    });
    this.on("notStatic", (req, res) => {
      if (this.routerList.length === 0) {
        return this.emit("notRouter")
      }
      this._dispathRouter(req, res);
    });
  }
  // 路由
  add(url, controller) {
    this.routerList.push({router: url, action: controller});
  }

  useStatic(staticClass, chrownRoot) {
    // console.log("根路径：：",chrownRoot);
    // console.log("carp.Static:::",staticClass);
    // staticClass 是 class Static 类
    this.static = new staticClass(this, chrownRoot);
    // console.log(this.static);
  }
  setDebug(debug) {
    this.debug = debug;
  }
  setStatic(dir) {   
    if (!this.static) {
      throw("没有处理静态资源的中间件");
    } else {
      this.static.setStatic(dir);
    }

  }
  setError(error) {
    var getType = Object.prototype.toString;
    var errorType = getType.call(error);
    if (!(errorType === '[object Object]')) {
      throw("setError must be a object, but get " + errorType);
    }
    this.err = Object.assign({}, this.err, error);
  }
  _error(code, res) {
    this.err = err;
    let errorInfo = this.err[code];
    let resCode = code;
    if (!errorInfo) {
      resCode = "500",
      errorInfo = err["500"];
    }
    let status = errorInfo.code
    res.writeHead(status, {"Content-Type": errorInfo.resType});
    res.end(errorInfo.message);
  }
  _parseUrl(req) {
    req.urlStruct = url.parse(req.url, "parseQueryString")
  }
  _dispathRouter(req, res) {
    var getType = Object.prototype.toString;
    for (let router of this.routerList) {
      var type = getType.call(router.router);
      switch (type) {
      case '[object String]':
        if (req.urlStruct.pathname === router.router) {
          //console.log(req, res);
          const controller = new router.action(this, req, res);
          return controller.dispach();
        }
        break;
      case '[object RegExp]':
        if (router.router.test(req.urlStruct.pathname)) {
          const controller = new router.action(this, req, res);
          return controller.dispach()
        }
        break;
      default:
        break;
      }
    }
    this.emit("error", "404", res);
  }
  handle(req, res) {
    this._parseUrl(req);

    if (this.static && this.static.dispach) {
      this.static.dispach(req, res);
    } else {
      this.emit("notStatic", req, res)
    }
  }
  listen(args) {
    var server = http.createServer(this.handle.bind(this));
    return server.listen(args, () =>{
      if (this.debug) {
        console.log(this.name + " is listening on " + args);
      }
    });
  }
}
carp.Controller = Controller;
carp.Static = Static;

module.exports = carp;
