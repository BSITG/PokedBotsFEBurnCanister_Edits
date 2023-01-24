import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStepAsync } from '../wizard/WizardSlice';
import {  Row, Col, Card } from 'react-bootstrap';
import { WizardScreen, WizardScreenField } from '../../controls/Controls';
import { NavigationButton } from '../../controls/NavigationButton'
import {getCreditImage, getCreditBackgroundColor, getGen1TokenThumbnail} from '../../common/Common'

export const ConfirmBurn = () => {
    const dispatch = useDispatch();
    const { userTokens, tokensSelected, creditSelected } = useSelector((state) => state.burnReducer || {});

    const displayTokens = () => {
        return tokensSelected && tokensSelected.map((tokenId) => {
            return <Card key={tokenId} style={{ margin: '10px', display: 'inline-block' }} class="h-100">
                <Card.Img src={getGen1TokenThumbnail(userTokens, tokenId)} class='driverCardImage' style={{ objectFit: 'cover', width: '15rem' }}>
                </Card.Img >
            </Card>
        });
    }

    const displayCredit = () => {
        return <Card key={creditSelected} style={{ margin: '10px', display: 'inline-block' }} class="h-100">
            <div style={{ backgroundColor: getCreditBackgroundColor(creditSelected) }}>
                <Card.Img src={getCreditImage(creditSelected)} class='driverCardImage' style={{ objectFit: 'contain' }}>
                </Card.Img >
            </div>
        </Card>
    }

    return (
        <WizardScreen fluid>
            <Row fluid>
                <Col  xs={12} style={{ margin: 0, padding: 0, }} className="d-xs-block d-sm-block d-md-none" >
                    <NavigationButton label='Back'
                        direction='left'
                        onClick={() => { dispatch(setStepAsync('bots')); }} />
                </Col>
                <Col  xs={12} style={{ margin: 0, padding: 0, }} className="d-xs-block d-sm-block d-md-none" >
                    <NavigationButton label='Proceed To Burn'
                        direction='right'
                        onClick={() => { dispatch(setStepAsync('burn')); }} />
                </Col>
            </Row>
             <Row fluid>
                <Col style={{ margin: 0, padding: 0, textAlign: 'left'}} className="d-none d-md-block">
                    <NavigationButton label='Back'
                        direction='left'
                        onClick={() => { dispatch(setStepAsync('bots')); }} />
                </Col>
                <Col style={{ margin: 0, padding: 0, textAlign: 'right' }} className="d-none d-md-block">
                    <NavigationButton label='Proceed To Burn'
                        direction='right'
                        onClick={() => { dispatch(setStepAsync('burn')); }} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <WizardScreenField>
                        Driver Selected
                    </WizardScreenField>
                </Col>
            </Row>
            <Row>
                <Col>
                    {displayCredit()}
                </Col>
            </Row>
            <Row>
                <Col>
                    <WizardScreenField>
                        Bots Selected
                    </WizardScreenField>
                </Col>
            </Row>
            <Row style={{ margin: '20px' }} >
                    <Col >
                        {displayTokens()}
                    </Col>
             </Row>
        </WizardScreen>
    );
}