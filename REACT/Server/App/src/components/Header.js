import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';

class Header extends Component {

  render() {
    return (
      <div className="header__container" >
        <h1 className="header__title">Paul Rudolph</h1>
        {/*
        <div className="header__links">
          <NavLink className="header__pageLink" to="/"      activeClassName="header--activePage" exact={true}>Home</NavLink>
          <NavLink className="header__pageLink" to="/about" activeClassName="header--activePage" exact={true}>About</NavLink>
          <NavLink className="header__pageLink" to="/posts" activeClassName="header--activePage" exact={true}>Posts</NavLink>
      </div>
        */}
      </div>
    );
  }
}

export default Header;
