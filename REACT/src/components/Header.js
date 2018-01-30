import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';

class Header extends Component {

  render() {
    return (
      <div className="header" >
        <h1 className="header__title">Paul Rudolph</h1>
        <div className="links">
          <NavLink className="pageLink" to="/" activeClassName="activePage" exact={true}>Home</NavLink>
          <NavLink className="pageLink" to="/about" activeClassName="activePage" exact={true}>About</NavLink>
          <NavLink className="pageLink" to="/posts" activeClassName="activePage" exact={true}>Posts</NavLink>
      </div>
      </div>
    );
  }
}

export default Header;
