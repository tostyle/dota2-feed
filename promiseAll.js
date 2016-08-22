var Promise = require("bluebird");
var ps =[];
 var p1 = new Promise(function(resolve,reject){
   setTimeout(function(){
        resolve('one')
   },2000)
 })

// console.log(p1);
 var p2 = new Promise(function(resolve,reject){
   setTimeout(function(){
        reject('twwww')
        // throw 'eeee'

   },1000)
 })
 ps.push(p2);
 ps.push(p1);
 Promise.all(ps).then(function(results){
   console.log(results)
 })


 var promises = [p1,p2];

Promise.all(promises.map(function(promise) {
  promise.catch(function(ff){

  })
return promise.reflect();
})

)
.then(function(inspections) {
  console.log(inspections)
inspections.map(function(inspection) {
if (inspection.isFulfilled()) {
console.log("fulfilled: ", inspection.value());
} else {
console.log("rejected:", inspection.reason());
}
})
})
.catch(function(err){

});
