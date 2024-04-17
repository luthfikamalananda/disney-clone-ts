import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../utils/axiosInstance";


export type MovieListState = {
    moviesNowPlaying: any[],
    moviesTrending: any[],
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
} 

const initialState: MovieListState = {
    moviesNowPlaying: [],
    moviesTrending: [],
    loading: 'idle'
}

export const getMovieNowPlaying = createAsyncThunk(
    'movieList/getMovieNowPlaying',
    async () => {
      try {
        const movies = await instance.get('/movies/now-playing')
        console.log('response movies', movies);
        
  
        if(movies.statusText === 'OK') {
          return movies.data.data.results
        } else {
          throw Error(movies.statusText)
        }
      } catch (error) {
        throw error;
      }
    },
  )

  export const getMovieTrending = createAsyncThunk(
    'movieList/getMovieTrending',
    async () => {
      try {
        const movies = await instance.get('/movies/top-rated')
        console.log('response movies', movies);
        
  
        if(movies.statusText === 'OK') {
          return movies.data.data.results
        } else {
          throw Error(movies.statusText)
        }
      } catch (error) {
        throw error;
      }
    },
  )

export const movieListSlice = createSlice({
    name:'movieList',
    initialState,
    reducers: {
        saveCredential: (state, action: PayloadAction<MovieListState>) => {
            state.moviesNowPlaying.push(action.payload)
          },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getMovieNowPlaying.fulfilled, (state, action) => {
          state.moviesNowPlaying = action.payload
          state.loading = "succeeded"
        })
        .addCase(getMovieNowPlaying.pending, (state) => {
          state.loading = 'pending'
        })
        .addCase(getMovieNowPlaying.rejected, (state) => {
          state.loading = 'failed'
        })
        .addCase(getMovieTrending.fulfilled, (state, action) => {
          state.moviesTrending = action.payload
          state.loading = "succeeded"
        })
        .addCase(getMovieTrending.pending, (state) => {
          state.loading = 'pending'
        })
        .addCase(getMovieTrending.rejected, (state) => {
          state.loading = 'failed'
        })
      },
})

export const {saveCredential} = movieListSlice.actions
export default movieListSlice.reducer