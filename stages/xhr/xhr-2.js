module.exports = {
  stage: 15,
  next: "xhr-3",
  async check(req, res) {
    if (req.body.greeting === "油中3周年快乐") {
      const pwd = Math.random();
      res.cookie("password-2", pwd, {
        httpOnly: true,
        path: "/xhr/xhr-2",
      });
      return res.send(200, pwd);
    }
  },
};
