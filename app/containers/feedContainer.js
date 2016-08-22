import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import Feed from '../componenets/feed';
import { showFeeds } from '../actions';
class FeedContainer extends Component {
  componentDidMount(){
        const { dispatch } = this.props;
        dispatch(showFeeds(123412344444444444));
  }
  render(){
    const { dispatch } = this.props;
    const { feed,fetchingFeed }  = this.props.feed;
    const isEmptyFeed = feed.length ===0;
    return (<div>
              {
                isEmptyFeed ?
                ( fetchingFeed ?
                    <h2>Loading Feed ...........</h2> :
                    <h3>Not Loading</h3>
                ) :
                <Feed
                feed={feed}/>
              }
            </div>)
  }
}
/*loadFriendDetail={ (friendID) => { dispatch( showFriendDetail( friendID ) ) } }*/
function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps)(FeedContainer)
