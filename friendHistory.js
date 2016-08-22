var Promise = require("bluebird");

function FreindHistory(api){
  this.API = api;
  this.showFriendHistory = function(){
     console.log(this.API);
  }
  this.getFriendHistory = function(friends){
    var DotAPI = this.API;
    var promises = [];
    friends.map(function(friend){
      var matchPromise = new Promise(function(resolve,reject){
          DotAPI.getMatchHistory({
          account_id: friend.steamid,
          matches_requested: 1
        }).then(function(history){
          history.friendID = friend.steamid;
          // console.log(history)
             resolve(history);
        },function(error){
          var e ={}
          // resolve(e);
          // console.log(error);
          reject(error)
        });
      });
      promises.push( matchPromise );
    })
    return promises;
  }
}
module.exports = FreindHistory;
