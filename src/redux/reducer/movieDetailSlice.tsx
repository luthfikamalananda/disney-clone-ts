import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import instance from "../../utils/axiosInstance";

export type MovieDetailState = {
    movieDetail: any,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: any | null,
    errorStatus: number | null
} 

const initialState: MovieDetailState = {
    movieDetail: null,
    loading: 'idle',
    error: null,
    errorStatus : null
}

export const getDetailMovie = createAsyncThunk(
    'movie/getDetailMovie',
    async (idMovies:string , { rejectWithValue }) => {
      try {
        const movies = await instance.get(`/movies/${idMovies}`)
        console.log('MOVIE DETAIL => ', movies);
        if (movies.statusText == 'OK') {
          return movies.data.data
        }
      } catch (error:any) {
        console.log('error thwor', error);
        return rejectWithValue(error.response)

      }
    },
  )


export const movieListSlice = createSlice({
    name:'movie',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(getDetailMovie.fulfilled, (state, action) => {
          state.movieDetail = action.payload
          console.log('movie payload =>', action);
          
          state.loading = "succeeded"
        })
        .addCase(getDetailMovie.pending, (state) => {
          state.loading = 'pending'
        })
        .addCase(getDetailMovie.rejected, (state, action:any) => {
          state.loading = 'failed',
          console.log('ACTION =>',action);
          state.error = action.payload.data.message
          state.errorStatus = action.payload.status
        })
      },
})

export const {} = movieListSlice.actions
export default movieListSlice.reducer