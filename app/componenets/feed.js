import React from 'react';
import FriendCard from '../componenets/friendCard'
export default class Feed extends React.Component {
  render(){
    const showFeed = this.props.feed.map((feedDetail,index) => {
      let matchHistory = feedDetail.result.matches;
      return <div key={feedDetail.friendID}>
       <h4>{feedDetail.friendID}</h4>
       <FriendCard key={feedDetail.friendID} friendID={feedDetail.friendID} matchHistory={matchHistory} />
       <hr/>
      </div>
    });
    return (<div>Dota2 Feed
      {showFeed}
      </div>);
  }
}
