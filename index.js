require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const dnsCheck = require('./controllers/url.js')



// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : false}))

app.use('/public', express.static(`${process.cwd()}/public`));
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});



// Your first API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});


app.post('/api/shorturl',  async (req,res)=>{
  const url = req.body.url;
  console.log(url);
  dnsCheck(url)
  //res.json(response)
  })
  
 /*  dns.lookup(url,(err,add) =>{
    if(err) {
      console.error(err)
      res.json({"error" : "Invalid URL"})
    }
    shorturls.push(url)
    let shorturlIndex = shorturls.indexOf(url) + 1;
    console.log(shorturls)
    res.json({
      "original_url" : url,
      "short_url" : shorturlIndex
    })
  }) */


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
