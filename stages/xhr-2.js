module.exports = {
  stage: 15,
  next: "xhr-3",
  html() {
    return `
		<div class="puzzle">
		  <p>这回我需要你从/xhr/xhr-2.html来获取密码</p>
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
      res.cookie("password-2", pwd);
      return res.send(200, pwd);
    } else if (
      req.cookies["password"] &&
      req.body.passwd === req.cookies["password-2"]
    ) {
      res.cookie("password-2", "");
      return res.redirect(this.next_page);
    }
    return res.send(400, "密码错误");
  },
};
