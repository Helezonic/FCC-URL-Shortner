require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dns = require('dns');
const app = express();



// Basic Configuration
const port = process.env.PORT || 4000;

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


app.post('/api/shorturl', (req,res)=>{
  const url = req.body.url;
  console.log(url);
  dns.lookup(url,(err,add) =>{
    if(err) {
      console.error(err)
      res.json({"error" : "Invalid URL"})
    }
    res.send(add)
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
