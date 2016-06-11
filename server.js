var Promise = require("bluebird");
var fetch = require('node-fetch');
var steam = require('steam-web');
var Dota2Api = require('dota2-api');

var config = require("./constant");
var key =config.STEAM_DEV_KEY
var api = "http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key="+key+"&steamid=76561198061756255&relationship=friend";

var steamAPI = new steam({
  apiKey: key,
  format: 'json' //optional ['json', 'xml', 'vdf']
});
var dota2API = Dota2Api.create( config.STEAM_DEV_KEY );
dota2API.getMatchDetails({
  match_id: "2135337215"
}).then(function(result){
    console.log(result);
});
// dota2API.getMatchHistory({
//   account_id: "76561198061756255",
//   matches_requested: 2
// }).then(function(result){
//   console.log('eeeeeeeeeeee');
//   console.log(result);
// });


var getFriendList = function(){
  return new Promise(function(resolve,reject){
      setTimeout(function(){
        return resolve
      },1000);
  });
}
function getFriends(){
  return new Promise(function(resolve,reject){
      fetch(api).then(function(res){
        resolve(res.json());
      })
  });
}
var getFriendDetail = function(friends){
  var myFriend = [];
  friends.map(function(friend){
      myFriend.push(friend.steamid);
  });
  return new Promise(function(resolve,reject){
    steamAPI.getPlayerSummaries({
      steamids: myFriend,
      callback: function(err, data) {
        if(err)
          reject();
        resolve(data);
      }
    })
  })
}
var getFriendHistory = function(friends){
  var promises = [];
  // console.log(friend.steamid)
  friends.map(function(friend){
      // console.log(friend.steamid)
    // var matchHistorys = dota2API.getMatchHistory({
    //   account_id: friend.steamid,
    //   matches_requested: 2
    // });
    // promises.push( matchHistorys );
    var matchPromise = new Promise(function(resolve,reject){
      dota2API.getMatchHistory({
        account_id: friend.steamid,
        matches_requested: 2
      }).then(function(history){
        history.friendID = friend.steamid;
        resolve(history);
      });
    });
    promises.push( matchPromise );

  })
  return promises;
}
var get
var friendIDs = [];
// getFriends().then(function(friends){
//
//     friends.friendslist.friends.map(function(friend){
//       friendIDs.push(friend.steamid);
//     })
//     // console.log(friendIDs);
//     // friendIDs.push(friends.friendslist.friends.steamid);
//     // var currentID = friends.friendslist.friends
//     var freindHistorys =  getFriendHistory(friends.friendslist.friends);
//     return Promise.all(freindHistorys)
// }).then(function(hostorys){
//     // console.log('sssssssssssssss')
//     // console.log(hostorys);
//     hostorys
//     .filter(function(allHistory){
//       return allHistory.result.status ==1;
//     })
//     .map(function(his,index){
//       // console.log(friendIDs[index])
//       // console.log(his);
//       // console.log('----------')
//       return his.result.matches
//     })
//     .map(function(match){
//       console.log(match)
//     })
// })

// getFriends().then(function(friends){
//     return getFriendDetail(friends.friendslist.friends);
// }).then(function(friendDetail){
//     console.log('sssssssssssssss')
//     console.log(friendDetail);
// })

// console.log(config);
// console.log('eeeeeee');
//
// setTimeout(function(){
//   console.log('ssssssssssssssssssssss')
// },3000);
