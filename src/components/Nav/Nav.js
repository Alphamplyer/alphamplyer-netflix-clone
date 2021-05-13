import React from "react";
import './Nav.scss'

function Nav() {
  return (
    <div className="nav">
      <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix logo" className="nav_logo"/>
      <img src="/netflix-avatar.png" alt="Avatar" className="nav_avatar"/>
    </div>
  );
}

export default Nav;