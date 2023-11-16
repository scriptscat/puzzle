module.exports = {
  stage: 13,
  next: "rank",
  html() {
    return `
      <div class="puzzle">
        <p>密码：【ಲಿ ಹೆಂಗ್ಡಾವೊ 24 ಕೆ ಶುದ್ಧ ಸುಂದರ】</p>
      </div>
      <div class="passwd">
      <input type="text" name="passwd" id="passwd"/>
      <input type="submit" name="Submit" id="submit" value="确认密码" />
      </div>
      `;
  },
  js() {
    return `
      document.addEventListener('copy',function (evt){
        evt.preventDefault();
      })
      document.addEventListener('cut',function (evt){
        evt.preventDefault();
      })
      document.addEventListener('selectstart',function (evt){
        evt.preventDefault();
      })
      document.addEventListener('contextmenu',function (evt){
        evt.preventDefault();
      })
      document.querySelector("#submit").addEventListener("click", function (evt) {
        if (document.querySelector("#passwd").value === "ಲಿ ಹೆಂಗ್ಡಾವೊ 24 ಕೆ ಶುದ್ಧ ಸುಂದರ") {
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
