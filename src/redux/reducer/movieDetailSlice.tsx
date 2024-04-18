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
        if(movies.statusText === 'OK') {
          return movies.data.data
        } else {
          throw Error(movies.statusText)
        }
      } catch (error) {
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
          state.loading = "succeeded"
        })
        .addCase(getDetailMovie.pending, (state) => {
          state.loading = 'pending'
        })
        .addCase(getDetailMovie.rejected, (state, action) => {
          state.loading = 'failed',
          state.error = action.payload
        })
      },
})

export const {} = movieListSlice.actions
export default movieListSlice.reducer