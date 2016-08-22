import 'whatwg-fetch';
export const SHOW_FEEDS         = 'SHOW_FEEDS';
export const SHOW_MATCH_DETAIL  = 'SHOW_MATCH_DETAIL';
export const SHOW_FRIEND_DETAIL = 'SHOW_FRIEND_DETAIL';
export const FETCH_FEED         = 'FETCH_FEED';
export const RECEIVE_FEED       = 'RECEIVE_FEED';
export const FETCH_FRIEND       = 'FETCH_FRIEND';
export const RECEIVE_FRIEND     = 'RECEIVE_FRIEND';
export const FETCH_MATCH        = 'FETCH_MATCH';
export const RECEIVE_MATCH      = 'RECEIVE_MATCH';


function fetchFeed(){
  return {
    type: FETCH_FEED
  }
}
function receiveFeed(feed){
  return {
    type: RECEIVE_FEED,
    feed
  }
}
function fetchFriend(friendID){
  return {
    type: FETCH_FRIEND,
    friendID
  }
}
function receiveFriend(friendID,profile){
  return {
    type: RECEIVE_FRIEND,
    friendID,
    profile
  }
}
function fetchMatch(matchID,friendID){
  return {
    type: FETCH_MATCH,
    matchID,
    friendID
  }
}
function receiveMatch(matchID,match,friendID){
  return {
    type: RECEIVE_MATCH,
    matchID,
    match,
    friendID
  }
}
function showFeedWrapper(userID=1){
  return dispatch => {
     dispatch(fetchFeed())
      fetch(`http://localhost:3000/feed`)
      .then(response => response.json())
      .then(json => dispatch(receiveFeed(json)))
  }
}
export function showFeeds(userID){
 // return showFeedWrapper();
  return dispatch => {
    return dispatch(showFeedWrapper(userID))
  }
}

export function showMatchDetail(matchID,friendID){
  return dispatch => {
     dispatch(fetchMatch(matchID,friendID))
      fetch(`http://localhost:3000/match/${matchID}`)
      .then(response => response.json())
      .then(match => dispatch( receiveMatch(matchID,match,friendID) ) )
  }
}

export function showFriendDetail(friendID){

  return dispatch => {
     dispatch(fetchFriend(friendID))
      fetch(`http://localhost:3000/friend/${friendID}`)
      .then(response => response.json())
      .then(profile => dispatch(receiveFriend(friendID,profile) ) )
  }
}
