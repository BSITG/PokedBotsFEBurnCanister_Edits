import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStepAsync } from '../wizard/WizardSlice';
import styled from 'styled-components';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { WizardScreen, CustomSpinner, WizardScreenField } from '../../controls/Controls';
import { ColoredText } from '../../controls/Controls';
import { NavigationButton } from '../../controls/NavigationButton'
import { CheckMarkControl } from '../../controls/CheckMarkControl';
import { setTokensSelectedAsync, setUserTokensAsync } from '../burn/BurnSlice'
import { Utils } from '../../helpers/Utils';

const SelectOvelay = styled(Card.ImgOverlay)`
    display: flex;
    padding: 0 ;
    background: ${props => props.overlayColor}66;
`

export const SelectBots = () => {
    const dispatch = useDispatch();
    const { status, eventsActor, gen1CanisterId } = useSelector((state) => state.authReducer || {});
    const { userTokens, tokensSelected, creditSelected } = useSelector((state) => state.burnReducer || {});
    const [tokensStatus, setTokensStatus] = useState('none');
    const { step } = useSelector((state) => state.wizardReducer || {})

    const getTotalTokens = () => {
        if (!Utils.isObjValid(userTokens)) return 0;
        return userTokens.length;
    }

    useEffect(() => {
        if (!Utils.isObjValid(userTokens)) setTokensStatus('none');
        else if (getTotalTokens() > 0) setTokensStatus('available');
        else setTokensStatus('notAvailable');
    }, [userTokens]);

    const getTokenItems = (tokenIds) => {
        return tokenIds && tokenIds.map((tokenId) => {
            return {
                tokenId: tokenId,
                imageUrlThumbnail: `https://${gen1CanisterId}.raw.ic0.app/?type=thumbnail&tokenid=${tokenId}`,
                imageUrl: `https://${gen1CanisterId}.raw.ic0.app/?tokenId=${tokenId}`
            }
        });
    }

    useEffect(() => {
        async function Do() {
            if (getTotalTokens() > 0) setTokensStatus('available');
            else if (status === 'loggedIn' && Utils.isObjValid(eventsActor)) {
                // get whitelisted bots for the logged in user
                setTokensStatus('gettingTokens');
                var result = await eventsActor.candidates();
                dispatch(setUserTokensAsync(getTokenItems(result)));
            }
        }
        step === 'bots' && Do();
    }, [step, status, eventsActor]);

    const isTokenSelected = (tokenId) => {
        return Utils.isObjValid(tokensSelected) && tokensSelected.indexOf(tokenId) >= 0;
    }

    const displayTokens = () => {
        return userTokens && userTokens.map((token) => {
            return <Card key={token.tokenId} style={{ margin: '10px', display: 'inline-block', cursor: 'pointer' }} class="h-100"
                onClick={() => {
                    var indexOf = Utils.isObjValid(tokensSelected) ? tokensSelected.indexOf(token.tokenId) : -1;

                    // dont allow any more tokens selection if already enough tokens selected based on the credit type.
                    if(indexOf == -1 && isEnoughTokensSelected() === true) return;    

                    if (indexOf >= 0) {
                        var copy = [...tokensSelected];
                        copy.splice(indexOf, 1);
                        dispatch(setTokensSelectedAsync(copy));
                    }
                    else 
                    {
                        !Utils.isObjValid(tokensSelected) && dispatch(setTokensSelectedAsync([token.tokenId]));
                        tokensSelected && dispatch(setTokensSelectedAsync([...tokensSelected, token.tokenId]));
                    }
                }}>
                <Card.Img src={token.imageUrlThumbnail} class='driverCardImage' style={{ objectFit: 'contain' }}>
                </Card.Img >
                {isTokenSelected(token.tokenId) && <SelectOvelay overlayColor='grey'>
                    <CheckMarkControl size='big'/>
                </SelectOvelay>}
            </Card>
        });
    }

    const isEnoughTokensSelected = () => {
        if(!Utils.isObjValid(tokensSelected)) return false;
        const totalBotsToSelect = creditSelected + 2;
        if(tokensSelected.length == totalBotsToSelect) return true;
        return false;
    } 

    const disableNextButton = () => {
        if(!Utils.isObjValid(tokensSelected) || tokensSelected.length == 0) return true;
        return isEnoughTokensSelected() == false;
    }

    return (
        <WizardScreen fluid>
            <Row fluid>
                <Col xs={12} style={{ margin: 0, padding: 0, }} className="d-xs-block d-sm-block d-md-none" >
                    <NavigationButton label='Back'
                        direction='left'
                        onClick={() => { 
                            dispatch(setTokensSelectedAsync(null)); 
                            dispatch(setStepAsync('driver')); 
                        }} />
                </Col>
                <Col xs={12} style={{ margin: 0, padding: 0, }} className="d-xs-block d-sm-block d-md-none" >
                    <NavigationButton label='Confirm Your Burn'
                        direction='right' disabled={disableNextButton()}
                        onClick={() => { dispatch(setStepAsync('confirm-burn')); }} />
                </Col>
            </Row>
            <Row fluid >
                <Col style={{ margin: 0, padding: 0, textAlign: 'left'}} className="d-none d-md-block">
                    <NavigationButton label='Back'
                        direction='left'
                        onClick={() => { 
                            dispatch(setTokensSelectedAsync(null)); 
                            dispatch(setStepAsync('driver')); 
                        }} />
                </Col>
                <Col className="d-none d-md-block" style={{ margin: 0, padding: 0, textAlign: 'right'}} >
                    <NavigationButton label='Confirm Your Burn'
                        direction='right' disabled={disableNextButton()}
                        onClick={() => { dispatch(setStepAsync('confirm-burn')); }} />
                </Col>
            </Row>
            <Row fluid >
                <Col >
                    <WizardScreenField>
                        Select {creditSelected + 2} Bots To Burn
                    </WizardScreenField>
                </Col>
            </Row>
            {(tokensStatus === 'none' || tokensStatus === 'gettingTokens') &&
                <Container style={{ height: '15vh' }} fluid>
                    <Row className={'h-100'}>
                        <Col className={'my-auto'} >
                            <CustomSpinner />
                        </Col>
                    </Row>
                </Container>}
            {tokensStatus === 'available' &&
                <Row style={{ margin: '20px' }} >
                    <Col >
                        {displayTokens()}
                    </Col>
                </Row>}
            {tokensStatus === 'notAvailable' &&
                <Container style={{ height: '15vh' }} fluid>
                    <Row className={'h-100'}>
                        <Col className={'my-auto'} >
                            <ColoredText>Sorry. There are no Bots registered to burn!</ColoredText>
                        </Col>
                    </Row>
                </Container>
            }
        </WizardScreen>
    );
}