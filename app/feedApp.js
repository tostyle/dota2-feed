import React from 'react';
import ReactDOM from 'react-dom';
import FeedContainer from './containers/feedContainer';

import { Provider } from 'react-redux'
import configureStore from './store/store'

const store = configureStore();
console.log(store);
ReactDOM.render(
  <Provider store={store}>
  <FeedContainer />
  </Provider>
  ,document.getElementById('content')
)
