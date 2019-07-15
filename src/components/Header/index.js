import React from 'react';
import { Link } from 'react-router-dom';


const Header = ( {title} ) => (
  <div>
    <div>      
      <h2>{ title }</h2>
      <ul>
        <li><Link to='/home'>HOME</Link></li>
        <li><Link to='/greetings'>GREETINGS</Link></li>       
        <li><Link to='/about'>ABOUT</Link></li>
      </ul>
    </div>
  </div>
);
export default Header;