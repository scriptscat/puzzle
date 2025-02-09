const utils = require("../utils/utils");
const randomString = utils.randomString;
const httpRequest = utils.httpRequest;
const config = require("../config.json");

module.exports = {
  stage: 20,
  next: "blind",
  html() {
    let ret = `
			<div class="puzzle">
        <p>指尖跃动</p>
        <p>提示：区分大小写</p>
		  </div>
      <div class="key">
      </div>
			`;
    return ret;
  },
  beforeRsp(req, rsp) {
    // 生成字母表
    if (!req.session.keyDown) {
      req.session.keyDown = randomString(Math.floor(Math.random() * 40 + 20));
    }
    req.session.lasttime = null;
  },
  css() {
    return ``;
  },
  js() {
    return `
    let pos=0;
    let done = false;
    function req(now){
      fetch("",{
        method:"POST",
        body:"pos="+pos+"&now="+now,
        headers:{
          "Content-Type":"application/x-www-form-urlencoded"
        }
      }).then(res=>res.text()).then(html=>{
        if(html.length == 1){
          document.querySelector(".key").innerHTML += html;
        }else{
          alert(html);
          done = true;
        }
      });
    }
    oldAddEv.call(document,"keydown",ev=>{
      console.log(ev);
      if(!done && /^[a-z0-9]$/.test(ev.key.toLowerCase())){
        pos++;
        req(ev.key);
      }
    });
    req();
    `;
  },
  async check(req, res) {
    // 返回下一个字母
    let pos = req.body.pos;
    let tmp = req.session.keyDown;
    // 如果超过2秒
    if (
      !tmp ||
      (req.session.lasttime && Date.now() - req.session.lasttime > 2000)
    ) {
      return res.send(400, "跳这么慢，刷新重来");
    }
    if (pos == tmp.length) {
      req.session.lasttime = null;
      req.session.keyDown = null;
      req.session.user &&
        (await httpRequest({
          method: "POST",
          url: "https://bbs.tampermonkey.net.cn/plugin.php?id=tampermonkey_install:activity&activity=medal",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          form: {
            secret: config.oauth.rpcSecret,
            uid: req.session.user.id,
            medal: "挑战者 lv2",
          },
        }));
      return res.send(
        "下一关地址：" + this.next_page
      );
    } else if (!tmp[pos]) {
      pos = Math.floor(Math.random() * tmp.length);
    }
    if (pos > 0 && tmp[pos - 1] != req.body.now) {
      return res.send(400, "打错了，刷新重来");
    }
    if (pos > 2) {
      req.session.lasttime = Date.now();
    }
    return res.send(200, req.session.keyDown[pos]);
  },
};
