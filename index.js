require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const { dnsCheck, shorturls} = require('./controllers/url.js');



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


//CREATING SHORTURL TO INPUT URL
app.post('/api/shorturl', async(req,res)=>{  
  const url = req.body.url;
  try {
    const result = await dnsCheck(url);
    console.log("ShortUrls",shorturls)
    res.json(result);
  } catch (error) {
    res.json(error);
    //res.status(500).json({ error: 'Internal Server Error' });
  }
})

//Redirecting to PAGE BY SHORTURL PARAMETER
app.get('/api/shorturl/:url', (req,res) => {
  console.log(req.params.url) 
  let urlIndex = Number(req.params.url) - 1;
  console.log(urlIndex)
  console.log("Requested",shorturls[urlIndex])
  res.redirect(`https://${shorturls[urlIndex]}`)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
