import React from 'react';
import {connect } from 'react-redux';
import {Route, Redirect} from 'react-router-dom'


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
            <Component {...props }/>
        )

    )}/>
);

const mapStateToProps = (state)=>({
    isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps)(PrivateRoute); 

