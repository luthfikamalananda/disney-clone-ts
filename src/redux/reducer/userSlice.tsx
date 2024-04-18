import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import instance from '../../utils/axiosInstance'

export interface CredentialState {
  uId: string | null,
  phone: string | null,
  isLogged: boolean,
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: CredentialState = {
  uId: null,
  phone: null,
  isLogged: false,
  loading: 'idle' 
}

export const getCredential = createAsyncThunk(
  'user/getCredential',
  async () => {
    try {
      const response = await instance.get('http://localhost:3000/v1/accounts/me')
      console.log("response  =>", response)

      if (response.statusText == 'OK') {
        return response.data.data
      }
    } catch (error) {
      throw error;
    }
  },
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveCredential: (state, action: PayloadAction<CredentialState>) => {
      state.uId = action.payload.uId;
      state.phone = action.payload.phone;
      state.isLogged = action.payload.isLogged;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getCredential.fulfilled, (state, action) => {
      state.uId = action.payload.id
      state.phone = action.payload.phone
      state.isLogged = true
      state.loading = 'succeeded'
    })
    .addCase(getCredential.pending, (state) => {
      state.loading = 'pending'
    })
    .addCase(getCredential.rejected, (state,action) => {
      state.uId = null
      state.phone = null
      state.loading = 'failed'
      console.log('rejected jalan', action);
      
      state.isLogged = false
    })
  },
})

// Action creators are generated for each case reducer function
export const { saveCredential } = userSlice.actions
export default userSlice.reducer