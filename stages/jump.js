module.exports = {
  stage: 19,
  next: "rank",
  html() {
    let ret = `
			<div class="puzzle">
        <p>这么厉害</>
			  <p>我们来玩跳格子吧</p>
		  </div>
      <div class="jump">
      </div>
			`;
    return ret;
  },
  beforeRsp(req, rsp) {
    // 生成格子
    if (!req.session.tmp) {
      let tmp = [];
      for (let i = 0; i < Math.floor(Math.random() * 20 + 20); i++) {
        let subTmp = [];
        let num = Math.floor(Math.random() * 6 + 2);
        // 插入num个0到subTmp
        for (let j = 0; j < num; j++) {
          subTmp.push(0);
        }
        // 随机取一个标记为1
        subTmp[Math.floor(Math.random() * num)] = 1;
        tmp.push(subTmp);
        req.session.tmp = tmp;
      }
    }
    req.session.lasttime = null;
  },
  css() {
    return `
    .block{
      display: block;
    }
    .round{
      display: inline-block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #000;
        margin-left: 10px;
    }
    .square{
      display: inline-block;
        width: 30px;
        height: 30px;
        border-radius: 0%;
        background-color: #000;
        margin-left: 10px;
    }
    `;
  },
  js() {
    return `
    let pos=0;
    function req(now){
      fetch("",{
        method:"POST",
        body:"pos="+pos+"&now="+now,
        headers:{
          "Content-Type":"application/x-www-form-urlencoded"
        }
      }).then(res=>res.text()).then(html=>{
        document.querySelector(".jump").innerHTML+=html;
      });
    }
    window.next=(now)=>{
      pos++;
      req(now);
    }
    req();
    `;
  },
  async check(req, res) {
    // 返回下一个格子
    let pos = req.body.pos;
    let tmp = req.session.tmp;
    // 如果超过2秒
    if (
      !pos ||
      !tmp ||
      (req.session.lasttime && Date.now() - req.session.lasttime > 2000)
    ) {
      return res.send(400, "跳这么慢，刷新重来");
    }
    if (pos > 0 && tmp[pos - 1][req.body.now] != 1) {
      return res.send(400, "跳错了，刷新重来");
    }
    if (pos == tmp.length) {
      req.session.lasttime = null;
      req.session.tmp = null;
      return "<script>window.location.href='" + this.next_page + "'</script>";
    } else if (pos > tmp.length || !tmp[pos]) {
      pos = Math.floor(Math.random() * tmp.length);
    }
    // 生成格子
    let ret = "<div class='block'>";
    for (let i = 0; i < tmp[pos].length; i++) {
      if (tmp[pos][i] == 1) {
        ret += `<div class="round" onclick="window.next(${i})"></div>`;
      } else {
        ret += `<div class="square"></div>`;
      }
    }
    ret += `</div>`;
    console.log(ret);
    if (pos > 2) {
      req.session.lasttime = Date.now();
    }
    return res.send(200, ret);
  },
};
