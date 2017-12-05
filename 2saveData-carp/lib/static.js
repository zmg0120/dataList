// 引入fs 模块
var fs = require("fs");
// 引入 mime 模块
var mime = require("mime");
// 引入 path 模块
var path = require("path");

class Static {
  constructor(event, chrownRoot) {
    this.chrownRoot = path.normalize(chrownRoot + path.sep);
    this.event = event;
    this.staticList = [];
  }
  setStatic(dir) {
    // console.log("Class:::",dir);
    this.staticList.push(dir);
    // console.log(this.staticList);
    // this.staticList = ['staic'];
  }
  dispach(req, res) {
    // console.log("dispach:::",req.url);
    // console.log("this.staticList:::",this.staticList);
    if (this.staticList.length === 0) {
      return this.event.emit("notStatic", req, res);
    }
    let filepath = req.urlStruct.pathname;
    // console.log("filepath:::::",filepath);
    let absPath = path.join(this.chrownRoot, filepath);
    // console.log("absPath:::",absPath);
    if (!absPath.startsWith(this.chrownRoot)) {
      this.event.emit("error", "400");
    }
    for (let staticDir of this.staticList) {
      // const absStatic = path.normalize( "/"+ staticDir + path.sep);
      // const absStatic = path.join("/" + staticDir + "/");
      // console.log("absStatic:::",absStatic);
      // console.log("filepath:::",filepath);
      // console.log("staticDir::::",staticDir);
      if (filepath.startsWith(staticDir)) {
        return this._getStatic(absPath, res);
      }
    }
    return this.event.emit("notStatic", req, res)
  }
  _getStatic(filename, res) {
    // console.log("_getStatic:::",filename);
    let fileType = mime.getType(filename);
    // console.log("fileType:::",fileType);
    // 写入http头部
    fs.readFile(filename, function(err, data) {
      if (err) {
        this.event.emit("error", "fileError", res);
      }
      const stat = fs.statSync(filename);
      // console.log("stat:::", stat);
      res.writeHead(200, {
        "Content-Type": fileType
        /*
        "Last-Modified": stat.mtime,
        "Cache-Control": "public;max-age=86400",
        "Content-Length": stat.size.toString(),
        "ETag": stat.mtime+ "-" + stat.size
        */
      });
      res.end(data)
    }.bind(this));
  }
}

module.exports = Static;
