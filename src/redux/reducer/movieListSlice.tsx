import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../utils/axiosInstance";


export type MovieListState = {
    moviesNowPlaying: any[],
    moviesTrending: any[],
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    errorStatus: number | null
} 

const initialState: MovieListState = {
    moviesNowPlaying: [],
    moviesTrending: [],
    loading: 'idle',
    errorStatus: null
}

export const getMovieNowPlaying = createAsyncThunk(
    'movieList/getMovieNowPlaying',
    async (_, {rejectWithValue}) => {
      try {
        const movies = await instance.get('/movies/now-playing')
        console.log('response movies getNowPlaying', movies);
  
        if(movies.statusText === 'OK') {
          return movies.data.data.results
        } 
      } catch (error:any) {
        console.log('error dari now playing', error);
        return rejectWithValue(error.response)
      }
    },
  )

  export const getMovieTrending = createAsyncThunk(
    'movieList/getMovieTrending',
    async (_, {rejectWithValue}) => {
      try {
        const movies = await instance.get('/movies/top-rated')
        
        if(movies.statusText === 'OK') {
          return movies.data.data.results
        } else {
          throw Error(movies.statusText)
        }
      } catch (error:any) {
        console.log('error dari now playing', error);
        return rejectWithValue(error.response)
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
        .addCase(getMovieNowPlaying.rejected, (state,action:any) => {
          state.loading = 'failed'
          console.log('error yang sudah di action',action);
          state.errorStatus = action.payload.status
        })
        .addCase(getMovieTrending.fulfilled, (state, action) => {
          state.moviesTrending = action.payload
          state.loading = "succeeded"
        })
        .addCase(getMovieTrending.pending, (state) => {
          state.loading = 'pending'
        })
        .addCase(getMovieTrending.rejected, (state,action:any) => {
          state.loading = 'failed'
          console.log('error yang sudah di action',action);
          state.errorStatus = action.payload.status
        })
      },
})

export const {saveCredential} = movieListSlice.actions
export default movieListSlice.reducer