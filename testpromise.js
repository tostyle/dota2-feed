var Promise = require('promise');
var Q = require('q');
var fetch = require('node-fetch');

var key = "21575B9631850EA21215B1DA1B6A9D79";
var api = "https://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key="+key+"&steamid=76561198061756255&relationship=friend";

// var promise = new Promise(function (resolve, reject) {
//   get(api, function (err, res) {
//     console.log(res);
//   });
// });
function fetchsomething()
{
  var deferred = Q.defer();
  fetch(api)
  .then(function(resp) {
    // console.log(resp.json());
    return deferred.resolve(resp.json() );
  })
return deferred.promise;
}
// console.log(promise.resolve());
//
// fetchsomething().then(function(res){
//   console.log(res);
// });
// var x =Promise.resolve(api);
// // console.log(x);
// x.then(function(res){
//   console.log(res);
//
// });

//
Promise.all([ fetchsomething() ])
  .then(function (xx) {
    console.log(xx[0].friendslist);
    // console.log('aaaa');
    // var newobj = JSON.parse(xx[0]);
    //
    // console.log('ccccccc');
    // console.log(newobj);
    // console.log('dddddddd');
  });
