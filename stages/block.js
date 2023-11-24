module.exports = {
  stage: 18,
  next: "jump",
  html() {
    let ret = `
			<div class="puzzle">
			  <p>请计算一下有多少个方块</p>
        <p style="display:none">tips: 相同坐标只算1个</p>
			  <p>ps: 可以试试图片识别</p>
			  <p style="display:none">其实你可以试试hook</p>
			  <p>pss: 一次识别不成多试几次</p>
			  <p>psss: 你不会要一直提交到正确的吧😱</p>
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
    // 随机50-200
    if (!req.session.num2) {
      req.session.num2 = Math.floor(Math.random() * 150 + 50);
    }
    this.num = req.session.num2;
  },
  css() {
    return `
  .round{
	  display: inline-block;
		width: 100px;
		height: 100px;
		border-radius: 50%;
		background-color: #000;
  }`;
  },
  js() {
    let num = this.session.num2;
    let ret = `
const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

function drawSquare(x, y, size, color, borderColor, borderWidth) {
  context.fillStyle = color;
  context.fillRect(x, y, size, size);

  context.strokeStyle = borderColor;
  context.lineWidth = borderWidth;
  context.strokeRect(x, y, size, size);
}

`;
    for (let i = 0; i < num; i++) {
      let x = Math.floor(Math.random() * 900);
      let y = Math.floor(Math.random() * 900);
      let size = Math.floor(Math.random() * 80 + 20);
      ret += `drawSquare(${x}, ${y}, ${size}, 'blue','black',1);`;
      if (Math.random() > 0.5) {
        for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
          ret += `drawSquare(${x}, ${y}, ${size}, 'blue','black',1);`;
        }
      }
    }
    return ret;
  },
  async check(req, res) {
    if (req.session.num2 && req.body.passwd == req.session.num2) {
      req.session.num2 = null;
      return res.redirect(this.next_page);
    }
    return res.send(400, "密码错误");
  },
};
