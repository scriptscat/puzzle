module.exports = {
  stage: 15,
  next: "xhr-3",
  html() {
    return `
		<div class="puzzle">
		  <p>这回我需要你从/xhr/xhr-2.html来获取密码</p>
      <p style="display: none">作者在set-cookie处埋了坑</p>
	  </div>
		  <div class="passwd">
		  <input type="text" name="passwd" id="passwd"/>
		  <input type="submit" name="Submit" value="确认密码">
		</div>
		`;
  },
  async check(req, res) {
    if (
      req.cookies["password-2"] &&
      req.body.passwd === req.cookies["password-2"]
    ) {
      res.cookie("password-2", "");
      return res.redirect(this.next_page);
    }
    return res.send(400, "密码错误");
  },
};
