const map = {
  油: "猴",
  中: "周",
  网: "作",
  为: "庆",
  括: "油",
  猴: "脚",
  本: "开",
  发: "与",
  交: "流",
  子: "发",
  来: "已",
  成: "为",
  脚: "本",
  爱: "好",
  富: "的",
  划: "了",
  祝: "这",
  里: "不",
  仅: "有",
  着: "丰",
  学: "习",
  资: "源",
  还: "汇",
  众: "多",
  领: "域",
  佬: "同",
  时: "提",
  一: "系",
  布: "以",
  安: "装",
  平: "台",
  自: "从",
  第: "一",
  篇: "帖",
  经: "过",
  天: "转",
  眼: "间",
  我: "们",
  迎: "来",
  了: "三",
  周: "年",
  殊: "时",
  刻: "我",
  们: "精",
  心: "策",
  列: "活",
  动: "包",
  年: "勋",
  章: "挑",
  战: "者",
  勋: "章",
  以: "及",
  闯: "关",
  小: "游",
};

module.exports = {
  stage: 23,
  next: "font-next",
  html() {
    let ret = `
			  <div class="puzzle">
				<p>你已经学会加密通讯了，让我们来解密下面的内容吧</p>
				<p>提示：这是一段中文</p>
				<p class="OpenTypeSans">${this.str}</p>
			</div>
				<div class="passwd">
				<input type="text" name="passwd" id="passwd"/>
				<input type="submit" name="Submit" value="确认密码">
			  </div>
			  `;
    return ret;
  },
  beforeRsp(req, rsp) {
    let keys = Object.keys(map);
    let str = "";
    let pwd = "";
    for (let i = 0; i < Math.floor(Math.random() * keys.length + 30); i++) {
      const k = Math.floor(Math.random() * keys.length);
      str += map[keys[k]];
      pwd += keys[k];
    }
    this.str = str;
    req.session.pwd = pwd;
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
