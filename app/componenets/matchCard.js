import React,{ Component } from 'react';

export default class MatchCard extends Component {
    componentDidMount(){
        let { matchID, showMatchDetail } = this.props;
        showMatchDetail();
    }
    componentWillReceiveProps(nextProps){


    }
    shouldComponentUpdate(nextProps){
      return (typeof nextProps.match !=='undefined') &&
            (nextProps.match.matchID === this.props.matchID)
    }
    render(){
      let { match, matchID, showMatchDetail } = this.props;
      let matchLink = "http://www.dotabuff.com/matches/"+matchID;
      let matchDetail="Load Result !! ....";

      if( typeof match !=='undefined' )
      {
        if( match.friendWin )
            matchDetail = "(( WIN ))";
        else if ( !match.friendWin)
            matchDetail = "(( LOSE ))";
      }
      // console.log('@@@@@@@@@@@@@@test render')
      // console.log(matchDetail)
      // console.log(match)
      // console.log(match.friendWin)
      // console.log(match.fetchingMatchDetail)
      return(
        <div>
          <div>{matchDetail}</div>
          <a href={matchLink}>{matchID}</a>
        </div>
      )
    }
}
