import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

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
    const response = await fetch('http://localhost:3000/v1/accounts/me', {
      credentials: 'include'
    })
    const responseJson = await response.json()
    return responseJson.data
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
    builder.addCase(getCredential.fulfilled, (state, action) => {
      // Add user to the state array
      state.uId = action.payload.id
      state.phone = action.payload.phone
      state.isLogged = true
      state.loading = 'succeeded'
    })
    .addCase(getCredential.rejected, (state) => {
      // Add user to the state array
      state.uId = null
      state.phone = null
      state.isLogged = false
    })
  },
})

// Action creators are generated for each case reducer function
export const { saveCredential } = userSlice.actions
export default userSlice.reducer