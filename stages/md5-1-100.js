const utils = require("../utils/utils");
const httpRequest = utils.httpRequest;
const config = require("../config.json");

module.exports = {
  stage: 10,
  next: "base-hook",
  passwd:
    "c4ca4238a0b923820dcc509a6f75849bc81e728d9d4c2f636f067f89cc14862ceccbc87e4b5ce2fe28308fd9f2a7baf3a87ff679a2f3e71d9181a67b7542122ce4da3b7fbbce2345d7772b0674a318d51679091c5a880faf6fb5e6087eb1b2dc8f14e45fceea167a5a36dedd4bea2543c9f0f895fb98ab9159f51fd0297e236d45c48cce2e2d7fbdea1afc51c7c6ad26d3d9446802a44259755d38e6d163e8206512bd43d9caa6e02c990b0a82652dcac20ad4d76fe97759aa27a0c99bff6710c51ce410c124a10e0db5e4b97fc2af39aab3238922bcc25a6f606eb525ffdc569bf31c7ff062936a96d3c8bd1f8f2ff3c74d97b01eae257e44aa9d5bade97baf70efdf2ec9b086079795c442636b55fb6f4922f45568161a8cdf4ad2299f6d231f0e3dad99908345f7439f8ffabdffc498f13708210194c475687be6106a3b843c59dc048e8850243be8079a5c74d079b6d767d2f8ed5d21a44b0e5886680cb937693cfc748049e45d87b8c7d8b9aacd1ff1de774005f8da13f42943881c655f8e296a067a37563370ded05f5a3bf3ec4e732ced3463d06de0ca9a15b615367702e74f10e0327ad868d138f2b4fdd6f033e75ff09dd601bbe69f3510391521896ea9ab1baa0efb9e19094440c317e21b34173cb38f07f89ddbebc2ac9128303fc16a5320fa475530d9583c34fd356ef56364d3f0f495b6ab9dcf8d3b5c6e0b01182be0c5cdcd5072bb1864cdee4d3d6ee369853df766fa44e1ed0ff613f563bd1c383cd30b7c298ab50293adfecb7b1819ca14e7ea6328a42e0eb13d585e4c22a5bfc9e07964f8dddeb95fc584cd965da5771bce93e200c36f7cd9dfd0e5deaad67d8ab4f4c10bf22aa353e27879133cd645920e395fedad7bbbed0eca3fe2e03416a75f4cea9109507cacd8e2f2aefca1d0c6e83f027327d8461063f4ac58a617e62166fc8586dfa4d1bc0e1742c08bf7177163c833dff4b38fc8d2872f1ec66c8349cc7260ae62e3b1396831a8398fd9d4f495e875a2e075a1a4a6e1b9770f67c6a1e7ce56d3d6fa748ab6d9af3fd7642e92efb79421734881b53e1e1b18b6f457c545a9ded88f18ecee47145a72c0c0c7c76d30bd3dcaefc96f40275bdc0a2838023a778dfaecdc212708f721b7889a1158154dfa42caddbd0694a4e9bdc8d82c8d1619ad8176d665453cfb2e55f0a684eceee76fc522773286a895bc8436b53b3a3d6ab90ce0268229151c9bde119f61408e3afb633e50cdf1b20de6f46672b32a1f754ba1c09b3695e0cb6cde7f66f041e16a60928b05a7e228a89c3799093f65e080a295f8076b1c5722a46aa2072b030ba126b2f4b2374f342be9ed447f39f8317fbdb1988ef4c628eba0259144f683a84163b3523afe57c2e008bc8c03afdbd66e7929b125f8597834fa83a4ea5d2f1c4608232e07d3aa3d998e5135fc490ca45c00b1249bbe3554a4fdf6fb3295c76acbf4caaed33c36b1b5fc2cb1735b90b4568125ed6c3f678819b6e058a3f390d88e4c41f2747bfa2f1b5f87db14bfa6bb14875e45bba028a21ed380467cbbc409ec990f19c78c75bd1e06f215e2c420d928d4bf8ce0ff2ec19b37151432bb90e8976aab5298d5da10fe66f21dd2ddea18f00665ce8623e36bd4e3c7c5ad61ab143223efbc24c7d2583be69251d09bf41544a3365a46c9077ebb5e35c3fbd7939d674997cdb4692d34de8633c428dd2c7955ce926456240b2ff0100bde35f4a8d465e6e1edc05f3d8ab658c551d1fe173d08e959397adf34b1d77e88d7f033ab37c30201f73f142449d037028d43ec517d68b6edd3015b3edc9a11367b9778d5d219c5080b9a6a17bef029331cfe9fc289c3ff0af142b6d3bead98a92368d30a9594728bc39aa24be94b319d213ef815416f775098fe977004015c619393db85ed909c13838ff95ccfa94cebd9c7e1249ffc03eb9ded908c236bd1996d2a38a4a9316c49e5a833517c45d310707647966b7343c29048673252e490f7368613985ec49eb8f757ae6439e879bb2a54229abfcfa5649e7003b83dd475529492cc227532d17e56e07902b254dfad1098dce83da57b0395e163467c9dae521bf4b9ec30ad9f68f89b29639786cb62ef812b4ba287f5ee0bc9d43bbf5bbe87fb26657d5ff9020d2abefe558796b99584e2ef524fbf3d9fe611d5a8e90fefdc9ced3d2c21991e3bef5e069713af9fa6caac627ab1ccbdb62ec96e702f07f6425bf899139df5e1059396431415e770c6dd",
  async check(req, res) {
    if (req.body.passwd != this.passwd) {
      return res.send(400, "密码错误");
    }
    await httpRequest({
      method: "POST",
      url: "https://bbs.tampermonkey.net.cn/plugin.php?id=tampermonkey_install:activity&activity=medal",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      form: {
        secret: config.oauth.rpcSecret,
        uid: req.session.user.id,
        medal: "挑战者 lv1",
      },
    });
    return res.redirect(this.next_page);
  },
  html() {
    return `
    <div class="puzzle">
        <p>我猜你是手动在线算出来的,罚你把1-100这些都算出来,直接拼接给我就好</p>
    </div>
    <div class="passwd">
        <input type="text" name="passwd" id="passwd"/>
        <input type="submit" name="Submit" value="确认密码">
    </div>
    `;
  },
};
