import { createStore,applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'
import {
  showFeeds,
  showMatchDetail,
  showFriendDetail

} from '../actions'

import rootReducer from '../reducers'


export default function configureStore(initState={}){
  let store = createStore(rootReducer,
    applyMiddleware(thunk,createLogger())
      // initState,
      // compose(
      //   applyMiddleware(thunkMiddleware),
      //   window.devToolsExtension ? window.devToolsExtension() : f => f
      // )
  );
  // let store2 = compose(applyMiddleware(ReduxThunk))(createStore)(rootReducer);
  // return store2;
  return store;
}
if (module.hot) {
 console.log('Hot reload enabled !!!!!!!!!!!!!!!!!!')
}
// store.subscribe(() => {
//   console.log(store.getState())
//   console.log('-----------------')
// })
//
// store.dispatch(showFeeds(34543534534))
// store.dispatch(showMatchDetail(5))
// store.dispatch(showFriendDetail(4444))
