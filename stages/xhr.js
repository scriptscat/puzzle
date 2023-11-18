module.exports = {
  stage: 14,
  next: "xhr-2",
  html() {
    return `
		<div class="puzzle">
		  <p>请发送祝福语:"油中3周年快乐"过来获取密码</p>
		  <p>就像这样:greeting=油中3周年快乐</p>
	  </div>
		  <div class="passwd">
		  <input type="text" name="passwd" id="passwd"/>
		  <input type="submit" name="Submit" value="确认密码">
		</div>
		`;
  },
  async check(req, res) {
    if (req.body.greeting === "油中3周年快乐") {
      const pwd = Math.random();
      res.cookie("password", pwd);
      return res.send(200, pwd);
    } else if (
      req.cookies["password"] &&
      req.body.passwd === req.cookies["password"]
    ) {
      res.cookie("password", "");
      return res.redirect(this.next_page);
    }
    return res.send(400, "密码错误");
  },
};
