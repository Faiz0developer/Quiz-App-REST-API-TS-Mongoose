import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./slices/tokenSice";
import quizReducer from "./slices/quizSlice";
import registerReducer from "./slices/userRegisterSlice";
import userReducer from "./slices/userSlice";
import allpublishedquizReducer from "./slices/allQuizSlice";
import StartQuizReducer from "./slices/startExamSlice";

export const store = configureStore({
    reducer:{
        token:tokenReducer,
        myQuiz:quizReducer,
        register:registerReducer,
        user:userReducer,
        allPublishedQuiz:allpublishedquizReducer,
        StartQuiz:StartQuizReducer
    }
})

export type RootState = ReturnType<typeof store.getState>