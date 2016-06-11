var express = require('express');
var fetch = require('node-fetch');
var app = express();

var key = "21575B9631850EA21215B1DA1B6A9D79";
var api = "http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key="+key+"&steamid=76561198061756255&relationship=friend";
var getOwngame = function(steamID){
return "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?format=json&matches_requested=1&key="+key+"&account_id="+steamID;
};
var getProfile = function(steamID){
 return "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+key+"&steamids="+steamID
};
// // respond with "hello world" when a GET request is made to the homepage
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
      // res.send('hello world');
       next();
});

app.get('/', function(req, res) {
    var gamedetail = [];
    var friendCount =0;
    fetch(api)
    .then(function(resp) {
  		return resp.json();
  	}).then(function(json) {
      var friendlist = json.friendslist.friends
      console.log(friendlist.length);
      friendlist.forEach(function(item,index){
        fetch( getProfile( item.steamid ) )
        .then(function(profileData){
          return profileData.json();
        }).then(function( profile ){
            var userProfile = profile.response.players;
          fetch( getOwngame( item.steamid ) )
          .then(function(games) {
            return games.json();
          }).then(function(gamelist) {
              var publicProfile = gamelist.result.status ;
              var list = gamelist;
              if( publicProfile == 1)
              {
                  list.profile = userProfile;
                  gamedetail.push(list);
              }
              friendCount++;
              if(friendCount == friendlist.length)
              {
                  res.send( gamedetail );
              }
              else
              {
                // console.log(friendCount);
                console.log('load : '+friendCount+' of '+friendlist.length);
              }
          });
        });
      });
  	});
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
