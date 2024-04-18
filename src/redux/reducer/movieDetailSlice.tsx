import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../utils/axiosInstance";

export type MovieDetailState = {
    movieDetail: any,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    error: any | null,
} 

const initialState: MovieDetailState = {
    movieDetail: null,
    loading: 'idle',
    error: null
}

export const getDetailMovie = createAsyncThunk(
    'movie/getDetailMovie',
    async (idMovies:string) => {
      try {
        const movies = await instance.get(`/movies/${idMovies}`)
        console.log('MOVIE DETAIL => ', movies);
        if (movies.statusText == 'OK') {
          return movies.data.data
        }
      } catch (error:any) {
        console.log('error thwor', error);
        throw error;

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
          state.error = action.error.message
        })
      },
})

export const {} = movieListSlice.actions
export default movieListSlice.reducer