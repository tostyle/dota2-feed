import React from 'react';
import NavigationBar from './navigation';

export default class HelloServer extends React.Component {
    render(){
        return (
          <div>
              <NavigationBar/>
              <h1>Hello server side</h1>
          </div>
        );
    }
}
