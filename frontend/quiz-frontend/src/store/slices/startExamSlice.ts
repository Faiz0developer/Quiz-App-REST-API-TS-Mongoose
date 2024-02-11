import { createSlice } from "@reduxjs/toolkit";

interface InitialstateProps{
    startQuiz:{
        _id:string,
        name:string,
        category:string,
        passingPercentage:number,
        questionList:[]
    }
}

const initialState:InitialstateProps= {
    startQuiz:{
        _id:"",
        name:"",
        category:"",
        passingPercentage:0,
        questionList:[]
    }
}

export const startExamSlice = createSlice({
    name:"startExam",
    initialState,
    reducers:{
        startQuiz(state,action){
            state.startQuiz = action.payload
        }
    }
})

export const {startQuiz} = startExamSlice.actions;
export default startExamSlice.reducer;