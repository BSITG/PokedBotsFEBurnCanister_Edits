import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { setStepAsync } from '../wizard/WizardSlice';
import { useSelector, useDispatch } from 'react-redux'
import { resetBurnParametersAsync, setClaimIdAsync, setGen2TokensAsync, setTokensBurnedAsync } from './BurnSlice'
import { Row, Col, Button } from 'react-bootstrap';
import { WizardScreen, CustomSpinner } from '../../controls/Controls';
import { CheckMarkControl } from '../../controls/CheckMarkControl';
import { NavigationButton } from '../../controls/NavigationButton'
import { Utils } from '../../helpers/Utils';

const BurnButton = styled(Button)`
    padding: 0.6em 2em;
    border: none;
    outline: none;
    color: rgb(255, 255, 255);
    background: #111;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;

    &:after {
        z-index: -1;
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: #222;
        left: 0;
        top: 0;
        border-radius: 10px;
    }

    &:before {
        content: "";
        background: linear-gradient(
            45deg,
            #ff0000,
            #ff7300,
            #fffb00,
            #48ff00,
            #00ffd5,
            #002bff,
            #7a00ff,
            #ff00c8,
            #ff0000
        );
        position: absolute;
        top: -2px;
        left: -2px;
        background-size: 400%;
        z-index: -1;
        filter: blur(5px);
        -webkit-filter: blur(5px);
        width: calc(100% + 4px);
        height: calc(100% + 4px);
        animation: glowing-button-85 20s linear infinite;
        transition: opacity 0.3s ease-in-out;
        border-radius: 10px;
    }
    
    @keyframes glowing-button-85 {
        0% {
        background-position: 0 0;
        }
        50% {
        background-position: 400% 0;
        }
        100% {
        background-position: 0 0;
        }
    }
`

export const Burn = () => {
    const dispatch = useDispatch();
    const {  tokensSelected, creditSelected } = useSelector((state) => state.burnReducer || {})
    const { eventsActor, gen1Actor, status } = useSelector((state) => state.authReducer || {})
    const [burnInitiated, setBurnInitiated] = useState(false);
    const [burnStatus, setBurnStatus] = useState('idle');
    const [burnStatusChecks, setBurnStatusChecks] = useState([]);
    const { step } = useSelector((state) => state.wizardReducer || {})

    useEffect(() => {
        async function Do() {
            if (Utils.isObjValid(eventsActor)) {
                var result = await eventsActor.burned();
                dispatch(setTokensBurnedAsync(result));
            }
        }
        Do();
    }, [eventsActor]);

    const getCreditTypeSelected = () => {
        if (creditSelected == 0) return { 'cat1': null };
        if (creditSelected == 1) return { 'cat2': null };
        if (creditSelected == 2) return { 'cat3': null };
        if (creditSelected == 3) return { 'cat4': null };
        if (creditSelected == 4) return { 'cat5': null };
    }

    const getTextFromJson = (json) => {
        return JSON.stringify(json, (_, v) => typeof v === 'bigint' ? v.toString() : v);
    }

    const addToBurnStatusChecks = (type, message) => {
        setBurnStatusChecks(items => {
            return [
                ...items,
                {type: type, message: message}
            ]
        });
    }

    useEffect(() => {
        if(status === 'loggedOut' || step !== 'burn') {
            setBurnStatus('idle');
            setBurnInitiated(false);
            setBurnStatusChecks([]);
        }
    }, [status, step]);

    const submitForBurn = async () => {
        setBurnStatusChecks([]);
        setBurnStatus('inProgress');
        setBurnInitiated(true);

        var burnRequest = {
            'subaccount': [],
            'tokens': tokensSelected,
            'category': getCreditTypeSelected()
        };

        // attempt burn request
        try
        {
            var result = await eventsActor.burn(burnRequest);
            result.err && addToBurnStatusChecks('error', 'Encountered Error While Burn Request. Error: ' + getTextFromJson(result.err));
            result.ok && await burnRequestSuccess(result.ok);
        }
        catch(exception)
        {
            setBurnStatus('idle');
            addToBurnStatusChecks('error', 'Encountered Error While Burn Request. ' + exception.toString());
        }
    }

    const burnRequestSuccess = async (burnRequestResult) => {
        var result = null;
        
        // attempt bulk transfer
        try {
            addToBurnStatusChecks('success', 'Success: Burn Request Sent. Claim-Id: ' + burnRequestResult.reference);
            dispatch(setClaimIdAsync(burnRequestResult.reference));
            result = await gen1Actor.transferBulk(burnRequestResult.request);
            result.err && addToBurnStatusChecks('error', 'Encountered Error While Burn Request. Error: ' + getTextFromJson(result.err));
            if (result.ok) {
                addToBurnStatusChecks('success', 'Success: Bulk Transfer Of Gen1 Bots Completed.');
            }
        }
        catch (exception) {
            setBurnStatus('idle');
            addToBurnStatusChecks('error', 'Encountered Error While Bulk Transfer. ' + exception.toString());
        }

        // attempt claim
        try {
            if (result.ok) {
                result = await eventsActor.claim({ 'burn': burnRequestResult.reference });
                result.err && addToBurnStatusChecks('error', 'Encountered Error While Claiming Gen 2 Bot. Error: ' + getTextFromJson(result.err));
                if(result.ok) {
                    // addToBurnStatusChecks('success', 'Claim Successfull! Congrats :-) Your Gen 2 Token Id is ' + result.ok);
                    addToBurnStatusChecks('success', 'Success: Entire Burn Completed! Congratulations! 🥳');
                    
                    // clear all credits and tokens info
                    dispatch(resetBurnParametersAsync());

                    // and only store new gen2 token info. 
                    // if user needs to burn for another bot, 
                    // he/she needs to start over.
                    dispatch(setGen2TokensAsync(result.ok));

                    // get total burned tokens
                    result = await eventsActor.burned();
                    dispatch(setTokensBurnedAsync(result));

                    setBurnStatus('success');
                }
            }
        }
        catch (exception) {
            setBurnStatus('idle');
            addToBurnStatusChecks('error', 'Encountered Error While Claiming Gen 2 Bot. ' + exception.toString());
        }
    }

    const displayBurnStatusChecks = () => {
        return burnStatusChecks && burnStatusChecks.map((message) => {
            return (
                <div class="d-flex align-items-center" style={{ textAlign: 'left', width: '70vw', justifyContent: 'center', margin: '15px' }}>
                    {message.type === 'success' && <div class="d-inline-block" >
                        <CheckMarkControl size='small' />
                    </div>}
                    {message.type === 'error' &&  <div class="d-inline-block">
                        <CheckMarkControl size='small' type='error'/>
                    </div>}
                    <div class="d-inline-block" style={{marginLeft: '20px'}}>
                        <h4>{message.message}</h4>
                    </div>
                </div>
            );
        });
    }

    return (
        <WizardScreen fluid>
            <Row fluid>
                {burnInitiated === false && <Col xs={12} style={{ margin: 0, padding: 0, textAlign: 'left' }} >
                    <NavigationButton label='Back'
                        direction='left'
                        onClick={() => { dispatch(setStepAsync('confirm-burn')); }} />
                </Col>}
            </Row>
            <Row fluid>
                <Col>
                    <h3>It's Time To <em><b>Burn!</b></em></h3>
                    <h3>Click The Burn Button Below To Send Your Gen1 Bots For A New Gen 2.0 </h3>
                    <h3><b>IMPORTANT</b>: The Gen1 Bots You Have Selected To Burn Will Be <em>Removed</em> From Your Wallet.</h3>
                    <h3>Press The Button Now To Continue</h3>
                </Col>
            </Row>
            <Row fluid style={{ marginBottom: '20px', marginTop: '40px' }}>
                <Col>
                    <BurnButton onClick={() => {
                            if(burnStatus !== 'success') dispatch(() => submitForBurn());
                            else if(burnStatus == 'success') dispatch(setStepAsync('gen2bot'));
                        }}>
                        {burnStatus === 'success' && <h2>Click Here To See Your Gen 2.0 Bot</h2>}
                        {burnStatus === 'idle' && <h2>Burn</h2>}
                        {burnStatus === 'inProgress' && (
                            <Row className={'h-100'}>
                                <Col className={'my-auto'} >
                                    <CustomSpinner />
                                </Col>
                                <Col className={'my-auto'} >
                                    <h2>Burning...</h2>
                                </Col>
                            </Row>
                        )}
                    </BurnButton>
                </Col>
            </Row>
            <Row fluid style={{ marginBottom: '80px', marginTop: '20px', display: '-webkit-inline-box' }} >
                <Col xs='auto'>
                    {displayBurnStatusChecks()}
                </Col>
            </Row>
        </WizardScreen>
    );
}