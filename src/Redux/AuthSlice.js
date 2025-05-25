import { createSlice } from '@reduxjs/toolkit';



const authSlice = createSlice({
    name: 'auth',
    initialState: {
      token :null
    }
    ,
    reducers: {
      loginSlice: (state, action) => {
       console.log(action.payload)
       localStorage.setItem("authToken",action.payload.token)
          return {token:action.payload.token}
       
      },
      logoutSlice: (state) => {
  
       
        localStorage.removeItem('authToken');
         return {token:null}
        
      }

    },
  });
  
  export const { loginSlice, logoutSlice} = authSlice.actions;
  export default authSlice;