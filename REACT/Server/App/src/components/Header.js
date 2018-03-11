import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import {connect} from 'react-redux'
import { startLogout} from '../actions/auth'

  export const Header = ({startLogout,isAuthenticated}) =>(
    
      <div className="header__container" >
        <h1 className="header__title">Paul Rudolph</h1>
   
       {isAuthenticated && <button onClick = { startLogout} > Logout </button>}
        
        {/*
          <div className="header__links">
            <NavLink className="header__pageLink" to="/"      activeClassName="header--activePage" exact={true}>Home</NavLink>
            <NavLink className="header__pageLink" to="/about" activeClassName="header--activePage" exact={true}>About</NavLink>
            <NavLink className="header__pageLink" to="/posts" activeClassName="header--activePage" exact={true}>Posts</NavLink>
          </div>
        */}


      </div>
  )


  const mapStateToProps = (state, props) => ({
   isAuthenticated: !!state.auth.uid
  });

const mapDispatchToProps = (dispatch) => ({
  startLogout:()=>{ dispatch(startLogout())
  }
});


export default connect(mapStateToProps,mapDispatchToProps)(Header); 
