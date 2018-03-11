import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import AppRouter from './routers/AppRouter.js'
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
        console.log("USER LOGGED IN ");
    }else{
        console.log("USER LOGGED OUT")
    }

})