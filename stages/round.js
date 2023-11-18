module.exports = {
  stage: 16,
  next: "block",
  html() {
    let ret = `
		  <div class="puzzle">
			<p>请计算一下有多少个圆</p>
		</div>
			<div class="passwd">
			<input type="text" name="passwd" id="passwd"/>
			<input type="submit" name="Submit" value="确认密码">
		  </div>  <div>`;
    for (let i = 0; i < this.num; i++) {
      ret += `<div class="round"></div>`;
    }
    return ret + `</div>`;
  },
  beforeRsp(req, rsp) {
    // 随机500-1000
    this.num = Math.floor(Math.random() * 500 + 1000);
    req.session.num = this.num;
  },
  css() {
    return `
.round{
	display: inline-block;
	  width: 100px;
	  height: 100px;
	  border-radius: 50%;
	  background-color: #000;
}`;
  },
  js() {
    return ``;
  },
  async check(req, res) {
    if (req.body.passwd == req.session.num) {
      req.session.num = null;
      return res.redirect(this.next_page);
    }
    return res.send(400, "密码错误");
  },
};
