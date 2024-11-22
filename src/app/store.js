import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../fetaures/movieSlice"

const store = configureStore({
    reducer:{
        movie : movieReducer
    }
})

export default store