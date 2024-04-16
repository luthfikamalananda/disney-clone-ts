import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CredentialState {
  uId: string,
  phone: string,
  isLogged: boolean
}

const initialState: CredentialState = {
  uId: '',
  phone: '',
  isLogged: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveCredential: (state, action: PayloadAction<CredentialState>) => {
      state.uId = action.payload.uId;
      state.phone = action.payload.phone;
      state.isLogged = action.payload.isLogged;
      

    //   const credToStorage = {
    //     uId: state.uId,
    //     phone: state.phone
    //   }

    //   localStorage.setItem("credential", JSON.stringify(credToStorage));
    },
  },
})

// Action creators are generated for each case reducer function
export const { saveCredential } = userSlice.actions
export default userSlice.reducer