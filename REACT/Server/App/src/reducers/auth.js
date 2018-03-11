

export default (state = {} , action) =>{
  console.log("AUTH REDUCER", action);
  switch(action.type){

    case 'LOGIN':
      return {
        uid: action.uid
      };
      
    case 'LOGOUT':
      return{};

    default:
      return state;
  }
}
