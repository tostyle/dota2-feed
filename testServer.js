var express = require('express');
var Promise = require("bluebird");
var fetch = require('node-fetch');
var steam = require('steam-web');
var Dota2Api = require('dota2-api');
var FriendHistory = require('./FriendHistory');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

var config = require("./constant");
//WEBPACK HOT RELOAD
var webpackConfig = require('./webpack.config-components');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')

var compiler = webpack(webpackConfig)

var key =config.STEAM_DEV_KEY;

// var api = "http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key="+key+"&steamid=76561198061756255&relationship=friend";

var steamAPI = new steam({
  apiKey: key,
  format: 'json'
});
var dota2API = Dota2Api.create( config.STEAM_DEV_KEY );
var friendHis = new FriendHistory( dota2API );
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // res.header('Content-Type', 'application/json');
      // res.send('hello world');
       next();
});
// 76561198061756255
app.get('/client',function(req,res){
     res.sendFile(path.join(__dirname + '/dota2feed.html'));
});
app.get('/feed', function(req, res) {

    steamAPI.getFriendList({
        steamid: '76561198061756255',
        relationship: 'friend',
        callback: function(err,data) {
          if(err)
             res.send(err);
          historyPromises = friendHis.getFriendHistory(data.friendslist.friends);

          var all = Promise.all(historyPromises.map(function(historyPromise) {
              return historyPromise.reflect();
          }))
          .then(function(inspects){
            var testResult = inspects.map(function(ins){
              if (ins.isFulfilled()){
                return ins.value();
              }
              return config.ERROR_RESULT;
            })
            .filter(function(lineresult){
                return lineresult.result.status ==1
            });
            res.send(testResult);
          })
        },
    });
});

app.get('/friend/:friendID',function(req,res){
     res.set({ 'content-type': 'application/json;charset=utf-8' })
    //  console.log(res)
  steamAPI.getPlayerSummaries({
    steamids: [ req.params.friendID ],
    callback: function(err, data) {
      if(err){
        console.log(err)
          res.send(err)

      }

      console.log(data);
      // res.send(data);
      res.send(data.response)
    }
  })
});

app.get('/test',function(req,res){
  var testx = { test : 'testxx'};
  console.log(testx);
  res.send(testx)
})

app.get('/match/:matchID',function(req,res){
  dota2API.getMatchDetails({
    // match_id: "2135337215"
    match_id: req.params.matchID
  }).then(function(result){
    res.send(result)
  });
});
app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
