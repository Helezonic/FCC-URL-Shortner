const dns = require('dns');


let shorturls = [];

const dnsCheck = async (url) => {
  let reply;
  console.log("Inside DNSCheck")
  await dns.lookup(url, (err,add) =>{
    console.log("address",add)
    if(err) {
      console.error(err)
      return { "error" : "Invalid"}
    } else {
      console.log("DNS found")
      shorturls.push(url)
      let shorturlIndex = shorturls.indexOf(url) + 1;
      console.log("shorturls",shorturls)
      return {
        "original_url" : url,
        "short_url" : shorturlIndex
      }
    }
  })
  .then(reply => {console.log("reply",reply)})
  .catch(err => {console.log("Error looking up")})
  
  //if(!reply) console.log("error INVALIS")

}


const createShortUrl = (url) => {
  shorturls.push(url)
  let shorturlIndex = shorturls.indexOf(url) + 1;
  console.log(shorturls)
  return {
    "original_url" : url,
    "short_url" : shorturlIndex
  }
}


module.exports = dnsCheck