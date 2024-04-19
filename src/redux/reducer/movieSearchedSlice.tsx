import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../utils/axiosInstance";

// Define a type for the slice state
export interface MovieSearchedState {
    searchedMovies: any[] | null,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: any | null,
    errorStatus: number | null
}

// Define the initial state using that type
const initialState: MovieSearchedState = {
    searchedMovies: null,
    loading: 'idle',
    error: null,
    errorStatus: null
}


// First, create the thunk
export const getSearchedMovies = createAsyncThunk(
    'movieSearched/getSearchedMovies',
    async (inputSearch:string, { rejectWithValue }) => {
        try {
            const response = await instance.get('movies/search', {
                params: {
                    query: inputSearch
                }
            })
            if (response.statusText === 'OK') {
                return response.data.data
            }
        } catch (error: any) {
            return rejectWithValue(error.response)
        }
    },
)



export const movieSearchedSlice = createSlice({
    name: 'searchedMovies',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getSearchedMovies.fulfilled, (state, action) => {
            // Add user to the state array
            state.searchedMovies = action.payload
            state.loading = "succeeded"
        })
        builder.addCase(getSearchedMovies.pending, (state) => {
            // Add user to the state array
            state.loading = 'pending'
        })
        builder.addCase(getSearchedMovies.rejected, (state, action:any) => {
            // Add user to the state array
            state.loading = 'failed'
            state.error = action.payload.statusText
            state.errorStatus = action.payload.status
        })
    },
})

export const { } = movieSearchedSlice.actions

// Other code such as selectors can use the imported `RootState` type
export default movieSearchedSlice.reducer
