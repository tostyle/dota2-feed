// import fetch from 'isomorphic-fetch'
import React from 'react';
// import HelloServer from './componenets/helloServer';
import { Router, Route,IndexRoute, browserHistory } from 'react-router';
// console.log(browserHistory);
import HelloServer from './componenets/helloServer';
import HelloContainer from './componenets/helloContainer';
import Profile from './componenets/profile';
// console.log(fetch);
// console.log('eeeeeeeeeeeeeeeeeeee')
// export default class AppContainer extends React.Component {
//
//   render(){
//     return (
//     <Router >
//         <Route path="/" component={HelloServer} />
//         <Route path="/client" component={HelloServer} />
//         <Route path="/profile" component={Profile} />
//     </Router>
//
//     )
//   }
// }
export default (
    <Route path="/" component={HelloContainer}>
        <IndexRoute component={HelloServer}/>
        <Route path="/client" component={HelloServer}/>
        <Route path="/profile" component={Profile}/>
    </Route>
);
// console.log('ssss')
