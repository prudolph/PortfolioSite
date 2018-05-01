import React from 'react';
import {connect } from 'react-redux';
import {Route, Redirect} from 'react-router-dom'
import NotFound from '../components/NotFound'

export const PrivateRoute = ({
    isAuthenticated, 
    component:Component,
    ...rest
})=>(


    <Route {...rest} component={(props)=>(
        isAuthenticated?(
            //is authenticated
     
            <Component {...props }/>
        ):(
            //NOT Authenticated
             <Redirect to="/login"/>
        )

    )}/>
);

const mapStateToProps = (state)=>({
    isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps)(PrivateRoute); 

