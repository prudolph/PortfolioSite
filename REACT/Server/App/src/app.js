require('dotenv').load();
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import AppRouter,{history} from './routers/AppRouter.js'
import { login , logout } from './actions/auth'

import 'normalize.css/normalize.css';
import './stylesheets/main.scss'
import {firebase} from './firebase/firebase'
import { Provider } from 'react-redux'

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
)

ReactDOM.render(jsx,document.getElementById('app'));


firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        store.dispatch(login(user.uid));
        console.log("USER LOGGED IN ");
        console.log("CURRENT LOCATION:::: ",history.location.pathname)
        if(history.location.pathname ==="/login"){
            history.push('/admin/projects');
        }  

        console.log("process.env.VALIDUSERID",process.env.VALIDUSERID)
    }else{
        store.dispatch(logout());
        console.log("USER LOGGED OUT")
    }

})