// โหลด React มาใช้งาน
import React from 'react'
import ReactDOM from 'react-dom';

// โหลดความสามารถของ react-router มาใช้งาน
import { Router,browserHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

// โหลด route ต่างๆ ที่เราได้กำหนดไว้
import AppContainer from './app';
console.log(AppContainer);
// render ลงไปใน DOM ที่ #content
ReactDOM.render(
    <Router routes={AppContainer} history={browserHistory} >
    </Router>,
    document.getElementById('content')
);
// ReactDOM.render(
//   <AppContainer />,
//   document.getElementById('content')
// );
