var express = require('express');
const req = require('express/lib/request');
var app = express();
const fs = require('fs');


const settings_json = fs.readFileSync('settings.json');
let jitsi_url = JSON.parse(settings_json)["jitsi_url"];
//console.log(jitsi_url)

app.use("/css/", express.static('css'));
app.use("/js/", express.static('js'));
app.set('view engine', 'ejs');

let lcd_text = "";

app.get('/', function (req, res) {
    res.render("index" , {
        jitsi_url : jitsi_url
    });
   //res.sendFile(__dirname + "/index.html");
});

app.post('/set_text', function(req, res){
    lcd_text = req.query.lcd_text;
    res.send('OK ' + lcd_text);
});

app.get('/get_text', function(req, res){
    res.send(lcd_text);
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})