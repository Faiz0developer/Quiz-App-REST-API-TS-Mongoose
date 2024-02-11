import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    publishedQuiz:[]
}

export const allpublishedquizSlice = createSlice({
    name:'allPublishedQuiz',
    initialState,
    reducers:{
        getAllPublishedQuiz(state,action){
            state.publishedQuiz = action.payload
        }
    }
})

export const {getAllPublishedQuiz} = allpublishedquizSlice.actions;

export default allpublishedquizSlice.reducer;