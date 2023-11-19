module.exports = {
  stage: 16,
  next: "round",
  html() {
    return `
		<div class="puzzle">
		  <p>请从:wyz.ggnb.top发送祝福语:"油中3周年快乐"过来获取密码</p>
      <p style="display: none">可以试试referer这个header</p>
		  <p>就像这样:greeting=油中3周年快乐</p>
	  </div>
		  <div class="passwd">
		  <input type="text" name="passwd" id="passwd"/>
		  <input type="submit" name="Submit" value="确认密码">
		</div>
		`;
  },
  async check(req, res) {
    if (
      req.body.greeting === "油中3周年快乐" &&
      req.headers.referer.indexOf("wyz.ggnb.top") != -1
    ) {
      const pwd = Math.random();
      res.cookie("password-3", pwd);
      return res.send(200, pwd);
    } else if (
      req.cookies["password-3"] &&
      req.body.passwd === req.cookies["password-3"]
    ) {
      res.cookie("password-3", "");
      return res.redirect(this.next_page);
    }
    return res.send(400, "密码错误");
  },
};
