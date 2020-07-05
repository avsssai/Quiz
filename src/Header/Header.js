import React from 'react';
import './Header.css';

const Header = (props) => {
  return(
    <div className="Header">
        <div className="logo">Logo</div>
        <div className="title">Trivia</div>
        <div className="git">Git link</div>
    </div>
  )
}
export default Header;