import { createSlice } from '@reduxjs/toolkit'
import { createActorsAsync, loginSilentAsync, logoutAsync } from './LoginThunk'
import { Utils } from '../../helpers/Utils'
import { principalToAccountIdentifier } from '../../utils/nft-utils'

const initialState = {
  identity: null,
  address: null,
  gen1CanisterId: null,
  gen1Actor: null,
  gen2CanisterId: null,
  gen2Actor: null,
  eventsActor: null,
  status: 'loggedOut',
  walletType: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginSilentAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(loginSilentAsync.fulfilled, (state, { payload }) => {
        if (!Utils.isObjValid(payload) || payload.identity === null) {
          return initialState;
        }
        else {
          state.status = 'loggedIn';
          state.identity = payload.identity;
          state.address = principalToAccountIdentifier(payload.identity.getPrincipal().toText())
          state.walletType = payload.walletType;
          // console.log(`wallet type: ${state.walletType}, principal: ${state.identity.getPrincipal().toText()}`);
        }
      })
      .addCase(createActorsAsync.pending, (state) => {
        state.createActorsAsyncStatus = 'pending';
      })
      .addCase(createActorsAsync.fulfilled, (state, { payload }) => {
        if (payload !== null) {
          state.createActorsAsyncStatus = 'success';
          state.gen1CanisterId = payload.gen1CanisterId;
          state.gen1Actor = payload.gen1Actor;
          state.gen2CanisterId = payload.gen2CanisterId;
          state.gen2Actor = payload.gen2Actor;
          state.eventsActor = payload.eventsActor;
          console.log(`wallet type: ${state.walletType}, principal: ${state.identity.getPrincipal().toText()}`);
        }
        else {
          state.createActorsAsyncStatus = 'failure';
        }
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        return initialState;
      });
  },
})

// Action creators are generated for each case reducer function
export const { } = authSlice.actions

export default authSlice.reducer