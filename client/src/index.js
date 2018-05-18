import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import AppRouter, { history } from './routers/AppRouter.js'
import { login, logout } from './actions/auth'
import { firebase } from './firebase/firebase'
import { Provider } from 'react-redux'


import 'normalize.css/normalize.css';
import './stylesheets/main.css'

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("Checking if user is Admin: ", user)
        isAdminUser(user.uid,(result)=>{
            if(result){
                store.dispatch(login(user.uid));
                if (history.location.pathname === "/login") {
                    history.push('/admin/');
                }
            } else {
                store.dispatch(logout());
                if (history.location.pathname === "/login") {
                    history.push('/');
                }
            }
        });
    }
});


function isAdminUser(userID,callback){

        firebase.database().ref(`adminusers/`).once('value')
        .then((snapshot) => {
            const val = snapshot.val();
            const adminIds = Object.values(val);
            
           if(adminIds.includes(userID)){
                callback(true);
            }else{
                callback(false);
           }
        })
        .catch((e) => {
            console.log('Error fetching data', e);
            callback(false);
        });

}