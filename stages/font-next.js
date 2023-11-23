const chars = [
  "油",
  "猴",
  "中",
  "周",
  "网",
  "作",
  "为",
  "庆",
  "括",
  "油",
  "猴",
  "脚",
  "本",
  "开",
  "发",
  "与",
  "交",
  "流",
  "子",
  "发",
  "来",
  "已",
  "成",
  "为",
  "脚",
  "本",
  "爱",
  "好",
  "富",
  "的",
  "划",
  "了",
  "祝",
  "这",
  "里",
  "不",
  "仅",
  "有",
  "着",
  "丰",
  "学",
  "习",
  "资",
  "源",
  "还",
  "汇",
  "众",
  "多",
  "领",
  "域",
  "佬",
  "同",
  "时",
  "提",
  "一",
  "系",
  "布",
  "以",
  "安",
  "装",
  "平",
  "台",
  "自",
  "从",
  "第",
  "一",
  "篇",
  "帖",
  "经",
  "过",
  "天",
  "转",
  "眼",
  "间",
  "我",
  "们",
  "迎",
  "来",
  "了",
  "三",
  "周",
  "年",
  "殊",
  "时",
  "刻",
  "我",
  "们",
  "精",
  "心",
  "策",
  "列",
  "活",
  "动",
  "包",
  "年",
  "勋",
  "章",
  "挑",
  "战",
  "者",
  "勋",
  "章",
  "以",
  "及",
  "闯",
  "关",
  "小",
  "游",
];

// 转成4进制
function convertToQuaternary(decimal) {
  const quaternaryDigits = ["歪", "比", "巴", "卜"];
  let quaternary = "";
  while (decimal > 0) {
    const remainder = decimal % 4;
    quaternary = quaternaryDigits[remainder] + quaternary;
    decimal = Math.floor(decimal / 4);
  }
  return quaternary;
}

module.exports = {
  stage: 24,
  next: "rank",
  html() {
    let ret = `
			  <div class="puzzle">
				<p>被发现了，换一个加密方式！</p>
				<p>tips: 四进制、unicode</p>
				<p>${this.str}</p>
			</div>
				<div class="passwd">
				<input type="text" name="passwd" id="passwd"/>
				<input type="submit" name="Submit" value="确认密码">
			  </div>
			  <canvas id="myCanvas" width="1000" height="1000"></canvas>
			  `;
    return ret;
  },
  beforeRsp(req, rsp) {
    let pwd = "";
    for (
      let i = 0;
      i < Math.floor(Math.random() * (chars.length / 2) + 5);
      i++
    ) {
      const k = Math.floor(Math.random() * chars.length);
      pwd += chars[k];
    }
    req.session.pwd = pwd;
    let str = "";
    for (let i = 0; i < pwd.length; i++) {
      const char = pwd[i];
      const decimal = char.charCodeAt(0);
      const quaternary = convertToQuaternary(decimal);
      str += quaternary;
    }
    this.str = str;
    console.log(pwd, this.str);
  },
  check(req, resp) {
    if (req.session.pwd) {
      if (req.body.passwd === req.session.pwd) {
        req.body.passwd = "";
        return resp.redirect(this.next_page);
      }
      return resp.send(400, "密码错误");
    }
    return resp.send(400, "请先获取密码");
  },
  css() {
    return `
	@font-face {
		font-family: 'OpenTypeSans';
		src: url('../fonts/stage-23.otf') format('opentype');
	}
	
	.OpenTypeSans {
		font-family: "OpenTypeSans" !important;
		speak: none;
		font-style: normal;
		font-weight: normal;
		font-variant: normal;
		text-transform: none;
		line-height: 1;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	`;
  },
};
