const { Canvas } = require("canvas");

function regen() {
  const Codes = {
    a: "100000",
    k: "100010",
    u: "100011",
    e: "100100",
    o: "100110",
    z: "100111",
    b: "101000",
    l: "101010",
    v: "101011",
    h: "101100",
    r: "101110",
    c: "110000",
    m: "110010",
    x: "110011",
    d: "110100",
    n: "110110",
    y: "110111",
    f: "111000",
    p: "111010",
    g: "111100",
    q: "111110",
    i: "011000",
    j: "011100",
    s: "011010",
    t: "011110",
    w: "011101",
  };

  const canvas = new Canvas(600, 450, "image");
  const ctx = canvas.getContext("2d");
  //填充白色背景
  //ctx.fillStyle = 'white';
  //ctx.fillRect(0, 0, canvas.width, canvas.height);

  let answer = "";
  for (let i = 0; i < 18; i++) {
    const baseX = i % 6;
    const baseY = Math.floor(i / 6);
    //随机字母a-z
    const ab = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    const colors = Codes[ab];
    answer += ab;
    for (const [index, color] of colors.split("").entries()) {
      const x = index % 2;
      const y = Math.floor(index / 2);
      //画点
      ctx.beginPath();
      ctx.arc(
        25 + baseX * 100 + x * 50,
        25 + baseY * 150 + y * 50,
        10,
        0,
        Math.PI * 2
      );
      ctx.closePath();
      ctx.fillStyle = +color ? "black" : "white";
      ctx.fill();
      ctx.strokeStyle = "black";
      ctx.stroke();
    }
  }

  console.log("ANSWER", answer);
  return [answer, canvas.toDataURL()];
}
module.exports = {
  stage: 21,
  title: "Braille", // title提示
  next: "font",
  image: void 0,
  head() {
    return `
    <meta name="next" content="${this.next_page}" />`;
  },
  beforeRsp(req, rsp) {
    // 动态生成密码及Base64图片
    try {
      const [answer, image] = regen();
      // 每次请求都会刷新密码 因此将密码存储在session中固定
      req.session.answer = answer;
      this.image = image;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  html() {
    return `
            <div class="puzzle">
                <p class="tip">These strange markings seem to spell something out.</p>
                <p class="tip">Tips: 2 * 3 * 6 * 3</p>
                <p><img src="${this.image}"/></p>
            </div>
            <div class="passwd">
                <input type="text" name="passwd" id="passwd"/>
                <input type="submit" name="Submit" value="确认密码">
            </div>
        `;
  },
  async feedback(passwd) {
    if (!/[a-z]{18}/.test(passwd)) return `提示：密码为18个小写英文字母`; // 错误密码提示
    return `密码错误！`;
  },
  async check(req, rsp) {
    // 从session中获取储存的密码与请求核对
    if (req.session.answer.toLowerCase() === req.body.passwd.toLowerCase()) {
      return rsp.redirect(this.next_page);
    } else {
      return rsp.send(await this.feedback(req.body.passwd.toLowerCase()));
    }
  },
};
