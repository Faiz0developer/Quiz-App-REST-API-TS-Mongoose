import { createSlice } from "@reduxjs/toolkit";

interface RegisterType{
    token:string,
    email:string,
}

const initialState:RegisterType ={
    token:"",
    email:"",
}

export const registerSlice = createSlice({
    name:'registerUser',
    initialState,
    reducers:{
        userRegister(state,action){
            state.token = action.payload.data.token;
            state.email = action.payload.data.email;
        }
    }
})

export const {userRegister} = registerSlice.actions;

export default registerSlice.reducer