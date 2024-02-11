import { createSlice } from "@reduxjs/toolkit";

interface TokenState{
    token:string
}

const initialState:TokenState = {
    token:'',
}

export const tokenSlice = createSlice({
    name:'token',
    initialState,
    reducers:{
        setToken(state,action){
            state.token=action.payload
        }
    }
})

export const {setToken} = tokenSlice.actions

export default tokenSlice.reducer