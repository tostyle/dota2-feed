import { createStore,combineReducers } from 'redux';
import {
  SHOW_FEEDS,
  SHOW_MATCH_DETAIL,
  SHOW_FRIEND_DETAIL,
  FETCH_FEED,
  RECEIVE_FEED,
  FETCH_FRIEND,
  RECEIVE_FRIEND,
  FETCH_MATCH,
  RECEIVE_MATCH,
  showFeeds,
  showMatchDetail,
  showFriendDetail

} from '../actions'

import convertor from 'steam-id-convertor'
const feed = (state={
  fetchingFeed : false,
  feed :[]
},action) => {
    switch (action.type) {
      case FETCH_FEED :
        return Object.assign({}, state, {
          fetchingFeed: true
        })
      case RECEIVE_FEED :
        return Object.assign({}, state, {
          fetchingFeed: false,
          feed: action.feed
        })
        break;
      default:
        return state;
    }
}

const friend = (state=[],action) => {
  switch (action.type) {
    case SHOW_FRIEND_DETAIL :
      return [ ...state ,{
        friendID: action.friendID
      }]
    case FETCH_FRIEND:
      return [ ...state ,{
        friendID: action.friendID,
        fetchingProfile:true
      }]
    case RECEIVE_FRIEND:
      return state.map( friend => {
        if(friend.friendID == action.friendID)
            return {
              friendID: action.friendID,
              fetchingProfile:false,
              profile: action.profile.players[0]
            }
        return friend;
      })
      break;
    default:
      return state;
  }
}

const match = (state=[],action) => {
  switch (action.type) {
    case SHOW_MATCH_DETAIL :
      return Object.assign({}, state, {
        matchID: action.matchID
      })
    case FETCH_MATCH:
      return [ ...state ,{
        matchID: action.matchID,
        friendID: action.friendID,
        fetchingMatchDetail:true
      }]
    case RECEIVE_MATCH:
      return state.map( match => {
        if(match.matchID == action.matchID){
            let friendID32 = convertor.to32(action.friendID);
            let playerDetail = action.match.result.players.filter( (player) => {
                return player.account_id == friendID32;
            })
            let radiantWin = action.match.result.radiant_win;
            let isRadiant = playerDetail[0].player_slot <= 4 ;
            let friendWin = (isRadiant && radiantWin) || ( !isRadiant && !radiantWin );
            return {
              matchID: action.matchID,
              friendID: action.friendID,
              friendID32,
              friendWin,
              fetchingMatchDetail:false,
              match: action.match
            }
        }
        return match;
      })
    break;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  feed,
  friend,
  match,
})
export default rootReducer
