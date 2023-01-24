import { StoicIdentity } from "ic-stoic-identity";
import AppConfig, { getAllCanistersToWhitelist } from "../../AppConfig";
import { Utils } from '../../helpers/Utils'
import { Actor, HttpAgent } from "@dfinity/agent";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { idlFactory as gen1CanisterIdlFactory } from '../../IDLs/Gen1.did.js'
import { idlFactory as gen2CanisterIdlFactory } from '../../IDLs/Gen2.did.js'
import { idlFactory as eventsCanisterIdlFactory } from '../../IDLs/Events.did.js'

export const logoutAsync = createAsyncThunk('auth/logoutAsync', async () => {
  // logout from all wallets
  window?.ic?.plug?.disconnect();
  StoicIdentity.disconnect();
  return true;
});

export const loginSilentAsync = createAsyncThunk('auth/loginSilentAsync', async (walletType) => {

  // wallet type undefined. then try silent login.
  if (!Utils.isObjValid(walletType)) {
    // Try logging in with Stoic
    var identity = await LoginStoic(true);
    if (Utils.isObjValid(identity)) return { walletType: 'stoic', identity: identity };

    // if the identity is null, then try with plug
    identity = await LoginPlug(true);
    if (Utils.isObjValid(identity)) return { walletType: 'plug', identity: identity };
  }
  else {
    if (walletType === 'plug') {
      identity = await LoginPlug();
      return { walletType: 'plug', identity: identity };
    }
    else if (walletType === 'stoic') {
      identity = await LoginStoic();
      return { walletType: 'stoic', identity: identity };
    }
  }
  return null;
})

export const createActorsAsync = createAsyncThunk('auth/createActors', async (params) => {
  console.log('creating actors...');
  try {
    var identity = params.identity;
    var walletType = params.walletType;
    var eventsActor = await CreateActor(identity, AppConfig.host, AppConfig.eventCanisterId, eventsCanisterIdlFactory, walletType);
    var gen1CanisterId = (await eventsActor.burn_registry()).toString();
    var gen2CanisterId = (await eventsActor.claim_registry()).toString();
    var gen1Actor = await CreateActor(identity, AppConfig.host, gen1CanisterId, gen1CanisterIdlFactory, walletType);
    var gen2Actor = await CreateActor(identity, AppConfig.host, gen2CanisterId, gen2CanisterIdlFactory, walletType);
    console.log('creating actors successfull.');
    return { gen1Actor: gen1Actor, gen2Actor: gen2Actor, eventsActor: eventsActor, gen1CanisterId: gen1CanisterId, gen2CanisterId: gen2CanisterId };
  }
  catch (error) {
    console.log(`createActors Exception - ${error}`);
  }
})

const LoginPlug = async (silentLogin) => {
  const whitelist = getAllCanistersToWhitelist();;
  const connected = await IsPlugConnected();
  let result = null;

  if (connected && !Utils.isObjValid(window.ic.plug.agent)) {
    result = await window.ic.plug.createAgent({ whitelist })
  }
  else if (connected) return window.ic.plug.agent._identity;

  // perform actual login with stoic when the identity is null and 
  // when its not a silent login. 
  // silent login is attempted when the screen is just loaded and we
  // use that opportunity to check if there were prior login available in the browser.
  // if so, use it. it can be either stoic or plug or any other future wallets.
  if (!connected && !Utils.isObjValid(silentLogin)) result = await window.ic.plug.requestConnect({ whitelist });
  if (result) {
    return await window.ic.plug.agent._identity;
  }
  else if (Utils.isObjValid(silentLogin)) return null;
  else {
    throw "Failed to connect to your wallet";
  }
}

const GetWalletType = async (identity) => {
  if (!Utils.isObjValid(identity)) return null;
  return await IsPlugConnected() ? 'plug' : 'stoic';
}

const IsPlugAvailable = () => {
  return !(window?.ic?.plug === undefined);
}

const IsPlugConnected = async () => {
  if (window?.ic?.plug) {
    const connected = await window.ic.plug.isConnected();
    return connected;
  }

  return false;
}

const CreateActor = async (identity, host, canisterId, idlFactory, walletType) => {

  //if (await GetWalletType(identity) === 'stoic') {
  if (walletType === 'stoic') {
  
    const agentOptions = {
      host: host,
      identity: identity,
    };

    const agent = new HttpAgent(agentOptions);

    if (AppConfig.environment === 'development') await agent.fetchRootKey();

    return Actor.createActor(idlFactory, {
      agent,
      canisterId: canisterId,
    });
  }
  else if(walletType === 'plug') {
    const agentOptions = {
      host: host,
    };

    const agent = new HttpAgent(agentOptions);

    if (AppConfig.environment === 'development') await agent.fetchRootKey();

    return await window.ic.plug.createActor({
      canisterId: canisterId,
      interfaceFactory: idlFactory,
    });
  }
}

const LoginStoic = async (silentLogin) => {
  try {
    let identity = await StoicIdentity.load(undefined, true);

    // perform actual login with stoic when the identity is null and 
    // when its not a silent login. 
    // silent login is attempted when the screen is just loaded and we
    // use that opportunity to check if there were prior login available in the browser.
    // if so, use it. it can be either stoic or plug or any other future wallets.
    if (!Utils.isObjValid(identity) && !Utils.isObjValid(silentLogin)) {
      //No existing connection, lets make one!
      identity = await StoicIdentity.connect();
    }
    return identity;
  } catch (err) {
    console.log('LoginStoic: exception ' + err.toString())
    return null;
  }
}

