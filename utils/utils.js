var request = require("request");

function httpRequest(options) {
  return new Promise((resolve, reject) => {
    options.timeout = 5000;
    request(options, function (error, response) {
      if (error) {
        reject(error);
        throw new Error(error);
      }
      resolve(JSON.parse(response.body));
    });
  });
}

function randomString(len) {
  len = len || 32;
  var $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  var maxPos = $chars.length;
  var pwd = "";
  for (let i = 0; i < len; i++) {
    pwd = pwd + $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

module.exports = { httpRequest, randomString };
