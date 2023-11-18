module.exports = {
  stage: 8,
  next: "md5-rev",
  html() {
    return `
    <div class="puzzle">
    看不见我，看不见我
    </div>
    <div class="passwd">
        <input style="display:none" type="submit" name="Submit" value="确认密码">
    </div>
    `;
  },
  async check(req, rsp) {
    return rsp.redirect(this.next_page);
  },
};
