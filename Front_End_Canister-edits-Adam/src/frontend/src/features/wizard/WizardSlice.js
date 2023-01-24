import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    step: 'login'
}

export const wizardSlice = createSlice({
  name: 'wizardSlice',
  initialState,
  reducers: {
    setStepAsync: (state, {payload}) => {
        state.step = payload;
    },
  },
  extraReducers: (builder) => {
  },
})

// Action creators are generated for each case reducer function
export const { setStepAsync } = wizardSlice.actions

export default wizardSlice.reducer