import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStepAsync } from '../wizard/WizardSlice';
import styled from 'styled-components';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { WizardScreen, CustomSpinner, WizardScreenField } from '../../controls/Controls';
import { NavigationButton } from '../../controls/NavigationButton'
import { CheckMarkControl } from '../../controls/CheckMarkControl';
import { setCreditSelectedAsync, setCreditsAsync } from '../burn/BurnSlice'
import { Utils } from '../../helpers/Utils';
import {getCreditImage, getCreditBackgroundColor, isAddressWhitelisted} from '../../common/Common'
import AppConfig from '../../AppConfig';

const CardQuantity = styled.label`
    padding-bottom: '5px'
    font-size: 2em;
    font-weight: bold;
`

const SelectOvelay = styled(Card.ImgOverlay)`
    display: flex;
    padding: 0 ;
    background: ${props => props.overlayColor}66;
`

export const SelectDriver = (props) => {
    const dispatch = useDispatch();
    const { status, eventsActor, address } = useSelector((state) => state.authReducer || {});
    const { credits,  creditSelected, } = useSelector((state) => state.burnReducer || {});
    const [creditsStatus, setCreditsStatus] = useState('none');
    const { step } = useSelector((state) => state.wizardReducer || {})

    const getTotalCredits = () => {
        var count = 0;
        for (var index = 0; index < 5; index++)
            if (credits[index] > 0) count += credits[index];
        return count;
    }

    useEffect(() => {
        if (!Utils.isObjValid(credits)) setCreditsStatus('none');
        else if (getTotalCredits() > 0) setCreditsStatus('creditsAvailable');
        else setCreditsStatus('creditsNotAvailable');
    }, [creditSelected]);

    useEffect(() => {
        if (!Utils.isObjValid(credits)) setCreditsStatus('none');
        else if (getTotalCredits() > 0) setCreditsStatus('creditsAvailable');
        else setCreditsStatus('creditsNotAvailable');
    }, [credits]);

    useEffect(() => {
        async function Do() {
            
            // allow only whitelisted addresses for testing
            if(!isAddressWhitelisted(AppConfig.whitelistedForTest, address) && AppConfig.environment === 'production-testing') {
                dispatch(setCreditsAsync([]));
                return;
            }
            
            if (Utils.isObjValid(credits) && getTotalCredits() > 0) setCreditsStatus('creditsAvailable');
            else if (status === 'loggedIn' && Utils.isObjValid(eventsActor)) {
                // get credits for the logged in user
                setCreditsStatus('gettingCredits');
                var result = await eventsActor.credits(address);
                dispatch(setCreditsAsync(result.length > 0 ? result[0] : []));
            }
        }
        step === 'driver' && Do();
    }, [step, status, eventsActor]);

    const displayCredit = (type, quantity, color) => {
        return <Card key={type} style={{ margin: '10px', display: 'inline-block', cursor: 'pointer' }} class="h-100"
            onClick={() => { if(quantity > 0) dispatch(setCreditSelectedAsync(type)); }}
            disabled={quantity === 0}>
            <div style={{ backgroundColor: quantity === 0 ? 'grey' : `${color}` }}>
                {quantity === 0 &&
                    <Card.Img src={getCreditImage(type)} class='driverCardImage'
                        style={{ objectFit: 'contain', webkitFilter: 'grayscale(1)', filter: 'grayscale(1)' }}>
                    </Card.Img >}

                {quantity > 0 &&
                    <Card.Img src={getCreditImage(type)} class='driverCardImage' style={{ objectFit: 'contain' }}>
                    </Card.Img >}

                {creditSelected === type && <SelectOvelay overlayColor={color}>
                    <CheckMarkControl />
                </SelectOvelay>}
                {quantity == 0 && <CardQuantity>Not Available</CardQuantity>}
                {quantity == 1 && <CardQuantity>1 Available</CardQuantity>}
                {quantity > 1 && <CardQuantity>{quantity} Available</CardQuantity>}
            </div>
        </Card>
    }

    return (
        <WizardScreen fluid>
            <Row fluid>
                <Col xs={12} style={{ margin: 0, padding: 0, textAlign: 'right'}} >
                    <NavigationButton label='Select Your Bots' 
                        direction='right' disabled={creditSelected === null} 
                        onClick={() => { dispatch(setStepAsync('bots'));}}/>
                </Col>
            </Row>
            <Row fluid >
                <Col >
                    <WizardScreenField>
                        <h2>Select Your Driver</h2>
                    </WizardScreenField>
                </Col>
            </Row>
            {(creditsStatus === 'none' || creditsStatus === 'gettingCredits') &&
                <Container style={{ height: '15vh' }} fluid>
                    <Row className={'h-100'}>
                        <Col className={'my-auto'} >
                            <CustomSpinner />
                        </Col>
                    </Row>
                </Container>}
            {creditsStatus === 'creditsAvailable' &&
                <Row style={{ margin: '20px' }} >
                    <Col >
                        {displayCredit(0, credits && credits.length > 0 ? credits[0] : 0, getCreditBackgroundColor(0))}
                        {displayCredit(1, credits && credits.length > 1 ? credits[1] : 0, getCreditBackgroundColor(1))}
                        {displayCredit(2, credits && credits.length > 2 ? credits[2] : 0, getCreditBackgroundColor(2))}
                        {displayCredit(3, credits && credits.length > 3 ? credits[3] : 0, getCreditBackgroundColor(3))}
                    </Col>
                </Row>}
                {creditsStatus === 'creditsNotAvailable' &&
                <Row style={{ margin: '20px', marginBottom: '40px' }} >
                    <Col >
                        {displayCredit(0, 0, getCreditBackgroundColor(0))}
                        {displayCredit(1, 0, getCreditBackgroundColor(1))}
                        {displayCredit(2, 0, getCreditBackgroundColor(2))}
                        {displayCredit(3, 0, getCreditBackgroundColor(3))}
                    </Col>
                </Row>}
        </WizardScreen>
    );
}