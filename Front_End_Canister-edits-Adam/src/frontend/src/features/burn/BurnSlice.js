import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userTokens: null,
    credits: null,
    tokensSelected: null,
    creditSelected: null,
    claimId: null,
    gen2Token: null,
    tokensBurned: 0,
}

export const burnSlice = createSlice({
  name: 'burn',
  initialState,
  reducers: {
    setTokensBurnedAsync: (state, {payload}) => {
        state.tokensBurned = Number(payload);
    },
    setGen2TokensAsync: (state, {payload}) => {
        state.gen2Token = payload;
    },
    setUserTokensAsync: (state, {payload}) => {
        state.userTokens = payload;
    },
    setCreditsAsync: (state, {payload}) => {
        var intCredits = payload.map(item => Number(item));
        state.credits = intCredits;
    },
    setTokensSelectedAsync: (state, {payload}) => {
        state.tokensSelected = payload;
    },
    setCreditSelectedAsync: (state, {payload}) => {
        state.creditSelected = Number(payload);
    },
    resetBurnParametersAsync: (state) => {
        return initialState;
    },
    setClaimIdAsync: (state, {payload}) => {
        state.claimId = Number(payload);
    },
  },
  extraReducers: (builder) => {
  },
})

// Action creators are generated for each case reducer functiona
export const { setClaimIdAsync, setTokensBurnedAsync, setGen2TokensAsync, setUserTokensAsync, setCreditsAsync, setTokensSelectedAsync, setCreditSelectedAsync, resetBurnParametersAsync} = burnSlice.actions

export default burnSlice.reducer