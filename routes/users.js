var express = require("express");
var router = express.Router();
const config = require("../config.json");
const model = require("../models");
const App = require("../interface/app");
const utils = require("../utils/utils");
const httpRequest = utils.httpRequest;
const Account = model.user;
const Record = model.record;

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/oauth/login", async function (req, res) {
  // 从query中获取code
  if (!req.query["code"]) {
    return res.end("code is required");
  }
  // 通过code获取ak，再获取信息
  const ak = await httpRequest({
    method: "POST",
    url: "https://bbs.tampermonkey.net.cn/plugin.php?id=codfrm_oauth2:server&op=access_token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    form: {
      client_id: config.oauth.client,
      client_secret: config.oauth.secret,
      code: req.query["code"],
    },
  });
  if (!ak.access_token) {
    return res.end("access_token is required");
  }
  const userInfo = await httpRequest({
    method: "POST",
    url: "https://bbs.tampermonkey.net.cn/plugin.php?id=codfrm_oauth2:server&op=user",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    form: {
      access_token: ak.access_token,
    },
  });
  req.session.user = {
    id: userInfo.user.uid,
    username: userInfo.user.username,
    nickname: userInfo.user.username,
  };
  // 添加记录
  let user = await Account.findOne({
    where: { id: userInfo.user.uid },
  });
  let last = req.session.last || { stage: 0, url: "/" };
  if (!user) {
    // 登录即获得勋章
    await httpRequest({
      method: "POST",
      url: "https://bbs.tampermonkey.net.cn/plugin.php?id=tampermonkey_install:activity&activity=medal",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      form: {
        secret: config.oauth.rpcSecret,
        uid: userInfo.user.uid,
        medal: "油中3周年",
      },
    });
    await Account.create({
      id: userInfo.user.uid,
      username: userInfo.user.username,
      nickname: userInfo.user.username,
      passwd: "-",
      email: "-",
      lastlogin: new Date().valueOf() / 1000,
    });
  } else {
    user.lastlogin = new Date().valueOf() / 1000;
    user.save(user);
    // 查询记录
    let record = await Record.findOne({
      where: { user: user.id },
      order: [["stage", "DESC"]],
    });
    // 使用最大的进度
    if (last.stage < record.stage) {
      last = App.filter(record, ["stage", "url"]);
    } else {
      req.session.last = App.filter(record, ["stage", "url"]);
    }
  }
  let data = {
    user: userInfo.user.uid,
    url: last.url,
    stage: last.stage,
    pass_time: 0,
  };
  let record = await Record.findOne({
    where: { stage: data.stage, user: data.user },
  });
  if (!record) {
    await Record.create(data);
  }
  req.session.last = { url: data.url, stage: data.stage };
  res.redirect("/");
});

module.exports = router;
