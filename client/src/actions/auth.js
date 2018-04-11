import {firebase, googleAuthProvider } from '../firebase/firebase'

export const login = (uid)=> ({
    type: 'LOGIN',
    uid
})

export const startLogin = () => {
    console.log("Start LogIn ......");
    return () =>{
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

export const logout = () => ({
    type: 'LOGOUT'
  });

export const startLogout=()=>{
    console.log("Start Logout ......");
    return () =>{
        return firebase.auth().signOut();
    };
};
