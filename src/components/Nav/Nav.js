import React, {useEffect, useState} from "react";
import './Nav.scss'

function Nav() {
  const [show, handleShow] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <div className={`nav ${show && "show_nav_background"}`}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix logo" className="nav_logo"/>
      <img src="/netflix-avatar.png" alt="Avatar" className="nav_avatar"/>
    </div>
  );
}

export default Nav;