import React from 'react';
import { connect } from 'react-redux';
import { showFriendDetail, showMatchDetail } from '../actions';
import MatchCard from './matchCard';


// export default
class FriendCard extends React.Component {
    componentDidMount(){
      const { fetchFriendProfile, friendID } = this.props;
      fetchFriendProfile(friendID);
    }
    shouldComponentUpdate(nextProps){
      return nextProps.profile.friendID === this.props.friendID
    }
    render(){
      const { profile, match, friendID, matchHistory, fetchMatchDetail } = this.props;
      
      let loadingProfile = true;
      if(typeof profile === 'undefined')
          loadingProfile = true;
      else
          loadingProfile = profile.fetchingProfile
      const showMatchHistory = matchHistory.map( ( history, index) => {
          let matchLink = "http://www.dotabuff.com/matches/"+history.match_id;
          return <div key={history.match_id}>
                    <MatchCard
                        key={history.match_id}
                        matchID={history.match_id}
                        match={match}
                        showMatchDetail={ () => fetchMatchDetail(history.match_id,profile.friendID)} />
                 </div>
      })
      return(
        <div>
          {
             loadingProfile ?
            <h5>Loading Profile. . . </h5> :
            <div>
              <h5>ID is  <span>{profile.friendID}</span></h5>
              <img src={profile.profile.avatar} />
              <h3>{profile.profile.personaname} </h3>
              <div>{showMatchHistory}</div>
            </div>
          }
        </div>
      )
    }
}
function mamStateToProps(state,OwnProps){
  var profileFilter = state.friend.filter( profile => profile.friendID == OwnProps.friendID)
  var matchFilter   = state.match.filter( match => match.friendID == OwnProps.friendID)
    return {
      profile: profileFilter[0],
      match: matchFilter[0],
      friendID: OwnProps.friendID,
      matchHistory: OwnProps.matchHistory
    }
}
function mapDispatchToProps(dispatch){
    return {
        fetchFriendProfile: (friendID) => {dispatch( showFriendDetail( friendID ) )},
        fetchMatchDetail:   (matchID,friendID)  => {dispatch( showMatchDetail( matchID,friendID ) )}
    }
}

export default connect(mamStateToProps,mapDispatchToProps)(FriendCard)
