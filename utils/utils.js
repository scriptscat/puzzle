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

module.exports = { httpRequest };
