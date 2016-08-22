var Promise = require("bluebird");
var fetch = require('node-fetch');
var steam = require('steam-web');
var Dota2Api = require('dota2-api');

var config = require("./constant");
var key =config.STEAM_DEV_KEY
var api = "http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key="+key+"&steamid=76561198061756255&relationship=friend";
// console.log('ccccccc')
var steamAPI = new steam({
  apiKey: key,
  format: 'json' //optional ['json', 'xml', 'vdf']
});
var dota2API = Dota2Api.create( config.STEAM_DEV_KEY );
// dota2API.getMatchDetails({
//   match_id: "2135337215"
// }).then(function(result){
//     console.log(result);
// });
// dota2API.getMatchHistory({
//   account_id: "76561198061756255",
//   matches_requested: 2
// }).then(function(result){
//   console.log('eeeeeeeeeeee');
//   console.log(result);
// });
// var p1 = new Promise(function(resolve,reject){
//   dota2API.getMatchDetails({
//     match_id: "2135337215"
//   }).then(function(result){
//     console.log(result);
//     return  resolve(result);
//   });
// })
// var p2 = new Promise(function(resolve,reject){
//   dota2API.getMatchDetails({
//     match_id: "2135337215"
//   }).then(function(result){
//     console.log(result);
//       return resolve(result);
//   });
// })
// console.log(p1);
// Promise.all([p1,p2]).then(function(values){
//   console.log('xxxxxxxxxxxxx');
//   console.log(values);
//   // return values;
// })




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
  var ext =0;
  var runn = 0;
  // console.log(friend.steamid)
  friends.map(function(friend){
    runn++;
    // console.log(runn);
    // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
      // console.log(friend.steamid)
    // var matchHistorys = dota2API.getMatchHistory({
    //   account_id: friend.steamid,
    //   matches_requested: 2
    // });
    // promises.push( matchHistorys );
    var matchPromise = new Promise(function(resolve,reject){
      // console.log(resolve)
      dota2API.getMatchHistory({
        account_id: friend.steamid,
        matches_requested: 1
      }).then(function(history){
        ext++;
        history.friendID = friend.steamid;
        // con
        // console.log(ext);

        // console.log(history);
        // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
        // if(!err)
        //   console.log('eeeeeeeeeeeeeeeeee')
        // console.log(err);
        // console.log(history)
           resolve(history);
      },function(error){
        // console.log('qqqqqqqqqqqqqq')
        // console.log(friend.steamid);
        // console.log(error);
        var e ={}
        // resolve(e);

        reject(error)
      });
    });
    // matchPromise.then(function(rett){
    //   console.log(rett);
    //   console.log('00000000000000')
    // })
    // console.log(matchPromise);
    promises.push( matchPromise );


  })
  // console.log(promises)
  return promises;
}



// getFriends().then(function(friends){
  // console.log(friends);
// });
// var get
var friendIDs = [];
getFriends().then(function(friends){
  // console.log('dcccccccccccc')
  // console.log(friends.friendslist.friends.length);
  // console.log('>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,')
    friends.friendslist.friends.map(function(friend,indez){
      // console.log(indez);
      friendIDs.push(friend.steamid);
    })
    // console.log(friendIDs);
    // friendIDs.push(friends.friendslist.friends.steamid);
    // var currentID = friends.friendslist.friends
    // console.log(currentID)
    var lastresult=[];
    var freindHistorys =  getFriendHistory(friends.friendslist.friends);
    
    var all = Promise.all(freindHistorys.map(function(history) {
        // console.log(history);
        return history.reflect();
    }))
    .then(function(inspects){
      // console.log()
      // console.log(inspects)
      var testResult = inspects.map(function(ins){
        // console.log(ins._settledValueField.result);
        // console.log('0xxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
        if (ins.isFulfilled()){
          // console.log(ins.value())
          // console.log('0eq00000000000000000000000000000')
          return ins.value();
        }
        return { result: {status:15}};
      })
      .filter(function(lineresult){
        // console.log(lineresult.result.status)
        // console.log('ddddddddddddddddddddddd')
          return lineresult.result.status ==1

      });
      console.log(testResult);
    })
    // .catch(function(ferror){
    //   return ferror
    // })
    // .map(function(inspection){
    //
    //
    //   // inspects.each(function(inspection) {
    //       if (inspection.isFulfilled()) {
    //         // lastresult.push( inspection.value() )
    //         return  inspection.value()
    //         // console.log( inspection.value() )
    //           // console.log("A promise in the array was fulfilled with", inspection.value());
    //       } else {
    //         console.log('###################');
    //         console.log( inspection.reason() )
    //         return {}
    //           // console.error("A promise in the array was rejected with", inspection.reason());
    //       }
    //   // })
    // })
    // .then(function(showresult){
    //   // console.log(showresult)
    // });
    // all
    // .catch(function(errors){
    //   console.log('report  ')
    //   return (freindHistorys)
    // })
    // .then(function(xxxx){
    //   console.log('vvvvv------------------------------------v');
    //   console.log(xxxx);
    // },function(err){
    //   // console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')
    //   // console.log(err);
    // })
    // console.log(all);
    return Promise.all(freindHistorys)
})
// .then(function(hostorys){
//     console.log('sssssssssssssss')
//     console.log(hostorys);
    // hostorys
    // .filter(function(allHistory){
    //   return allHistory.result.status ==1;
    // })
    // .map(function(his,index){
    //   // console.log(friendIDs[index])
    //   console.log(his);
    //   // console.log('----------')
    //   return his.result.matches
    // })
    // .map(function(match){
    //   console.log(match)
    // })
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
