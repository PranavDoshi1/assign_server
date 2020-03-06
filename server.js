var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var db = require('./db');
var PORT = 5000
var http = require('http');

var https = require('https');

var cors = require('cors');

var fs = require('fs');

app.use(cors());
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.all("*", function(req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Credentials", true);
  res.set("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE");
  res.set(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Authorization"
  );
  if ("OPTIONS" == req.method) return res.sendStatus(200);
  next();
});

try {
  var controller = require('./model/controller')

app.use('/',controller)

var privateKey = fs.readFileSync('privkey.pem');

var certificate = fs.readFileSync('fullchain.pem');

var credentials = { key: privateKey, cert: certificate };

var httpServer = http.createServer(app);

var httpsServer = https.createServer(credentials, app,(req,res)=>{
  console.log('re.body:')
  console.log(req.body)
  res.end('test')
});
httpsServer.on('listening',function(){
  console.log('ok, server is running');
})
httpsServer.listen(PORT, () => console.log(`Listening on port 5000`));
} catch (error) {
  console.log(error)
}
// httpsServer.listen(PORT, () => console.log(`Listening on port 5000`));