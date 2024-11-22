import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import apiInstance from "../api/apiInstance";


const initialState = {
    movies: [],
    searchResults: [],
    movieDetails: null,
    users: [],
    currentUser: null,
    error: null,
    status: ""
}

export const fetchMovie = createAsyncThunk(
    "movie/fetchMovie",
    async (_, { rejectWithValue }) => {
        try {
            let res = await apiInstance.get("/movie/popular");
            return res.data.results;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const searchMovie = createAsyncThunk(
    "movie/searchMovie",
    async (query, { rejectWithValue }) => {
        try {
            const res = await apiInstance.get(`/search/movie?query=${query}`);
            return res.data.results;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchMovieDetails = createAsyncThunk(
    "movie/fetchMovieDetails",
    async (id, { rejectWithValue }) => {
        try {
            const res = await apiInstance.get(`/movie/${id}`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        signup: (state, action) => {
            state.users.push(action.payload); // Store user details after signup
        },
        login: (state, action) => {
            const foundUser = state.users.find(
                (user) => user.email === action.payload.email && user.password === action.payload.password
            );

            if (foundUser) {
                // User found, set the currentUser to the found user
                state.currentUser = foundUser;
                state.error = null; // Clear any existing error
            } else {
                // No user found, set an error message
                state.currentUser = {error : "Invalid user"}; // Set error message
            }
        },
        logout: (state) => {
            state.currentUser = null; // Clear the current user on logout
        },
    },
    extraReducers: (builder) => {
        // fetch
        builder.addCase(fetchMovie.pending, (state, action) => {
            state.status = "pending"
        })
            .addCase(fetchMovie.fulfilled, (state, action) => {
                state.movies = (action.payload);
                console.log(action.payload);
                state.status = "fullfilled"
            })
        builder.addCase(fetchMovie.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        })

        // search
        builder.addCase(searchMovie.pending, (state) => {
            state.status = "searching";
        });
        builder.addCase(searchMovie.fulfilled, (state, action) => {
            state.searchResults = action.payload;
            state.status = "fulfilled";
        });
        builder.addCase(searchMovie.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        });

        // mocie details
        builder.addCase(fetchMovieDetails.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchMovieDetails.fulfilled, (state, action) => {
            state.movieDetails = action.payload;
            state.status = "fulfilled";
        });
        builder.addCase(fetchMovieDetails.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        });
    }
})

export const { signup, login, logout } = movieSlice.actions;
export default movieSlice.reducer