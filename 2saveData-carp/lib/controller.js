class Controller {
  constructor(event, req, res) {
    this.resJson = {};
    this.resHtml = "";
    this.event = event;
    this.req = req;
    this.res = res;
  }
  get() {
    this.event.emit("error", "method", this.res)
  }
  post() {
    this.event.emit("error", "method", this.res)
  }
  put() {
    this.event.emit("error", "method", this.res)
  }
  head() {
    this.event.emit("error", "method", this.res)
  }
  delete() {
    this.event.emit("error", "method", this.res)
  }
  option() {
    this.event.emit("error", "method", this.res)
  }
  dispach() {
    var method = this.req.method.toLowerCase();
    // method = "get";
    // this.["get"] === this.get;
    // console.log(method);
    this[method]();
  }
  abort(code) {
    this.event.emit("error", code)
  }
  updateJson(data) {
    this.resJson = object.assign({}, this.resJson, data);
  }
  setJson(data) {
    this.resJson = data;
  }
  endJson() {
    let resJson = JSON.stringify(this.resJson);
    this.res.writeHead(200, {"Content-Type": "application/json;charset=utf-8"});
    this.res.end(resJson);
  }
  updateHtml(data) {
    this.resHtml += data;
  }
  setHtml(data) {
    this.resHtml = data;
  }
  endHtml() {
    this.res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    this.res.end(this.resHtml);
  }
}

module.exports = Controller;
