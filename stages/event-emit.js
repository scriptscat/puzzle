module.exports = {
  stage: 12,
  next: "fuck-copy",
  passwd: "123456",
  html() {
    return `
      <div class="puzzle">
        <p>密码123456</p>
      </div>
      <div class="passwd">
        <input type="text" name="passwd" id="passwd"/>
        <input type="submit" name="Submit" id="submit" value="确认密码" />
      </div>
      `;
  },
  js() {
    return `
    let statusFlag = false;
    let text = "";
    document.querySelector("#passwd").addEventListener("focus", function (evt) {
        statusFlag = true;
      });
      document.querySelector("#passwd").addEventListener("blur", function (evt) {
        text = document.querySelector("#passwd").value;
        statusFlag = false;
      });
      document.querySelector("#submit").addEventListener("click", function (evt) {
        if (text === "123456") {
          alert("成功~");
        } else {
          evt.preventDefault();
          alert("你还没有成功哦~");
        }
      });
        `;
  },

  async check(req, rsp) {
    return rsp.redirect(this.next_page);
  },
};
