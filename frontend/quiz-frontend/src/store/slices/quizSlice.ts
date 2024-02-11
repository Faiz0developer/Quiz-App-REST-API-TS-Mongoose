import { createSlice } from "@reduxjs/toolkit";

const initialState={
    quizData:[]
}

export const myQuizSlice = createSlice({
    name:"myQuiz",
    initialState,
    reducers:{
        myQuizData(state,action){
            state.quizData=action.payload
        }
    }
})

export const {myQuizData} = myQuizSlice.actions;
export default myQuizSlice.reducer