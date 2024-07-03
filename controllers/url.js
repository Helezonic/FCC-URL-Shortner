const dns = require('dns');


let shorturls = [];
let shorturlIndex;


//DNS LOOKUP AND RETURN JSON RESPONSE
const dnsCheck = (url) => {
  return new Promise((resolve, reject) => {
    dns.lookup(url, (err, add) => {
      if (err) {
        console.error(err);
        reject({ "error": "invalid URL" });
      } else {
        console.log("DNS found", add);
        if(!shorturls.includes(url)){
          resolve(createShortUrl(url));
        } else {
          resolve({"error" : "Already exists"})
        }
      }
    });
  });
}

//CREATING SHORTURL
const createShortUrl = (url) => {
  shorturls.push(url)
  shorturlIndex = shorturls.indexOf(url) + 1;
  return {
    "original_url" : url,
    "short_url" : shorturlIndex
  }
}

module.exports= { dnsCheck, shorturls}
