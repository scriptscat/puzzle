module.exports = {
  stage: 13,
  next: "rank",
  passwd: "ಲಿ ಹೆಂಗ್ಡಾವೊ 24 ಕೆ ಶುದ್ಧ ಸುಂದರ",
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

      });
        `;
  }
};
