import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import apiInstance from "../api/apiInstance";


const initialState = {
    movies: [],
    searchResults: [],
    movieDetails:null,
    users: [],
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
    reducers: {},
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

export default movieSlice.reducer