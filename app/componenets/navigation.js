import React from 'react';
import { Link } from 'react-router';

class NavigationBar extends React.Component{
  render(){
    return (
      <nav>
           <Link to="/client">Home</Link>
           <Link to="/profile">Profile</Link>
      </nav>);
  }
}
export default NavigationBar;
