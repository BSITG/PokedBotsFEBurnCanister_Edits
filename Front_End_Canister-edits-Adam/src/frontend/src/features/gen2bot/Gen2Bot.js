import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { WizardScreen, WizardScreenField } from '../../controls/Controls';
import { Utils } from '../../helpers/Utils';
import { resetBurnParametersAsync } from '../burn/BurnSlice'
import { setStepAsync } from '../wizard/WizardSlice';
import { ConfettiEffect } from '../../controls/ConfettiEffect'

export const Gen2Bot = () => {
    const { gen2Token } = useSelector((state) => state.burnReducer || {});
    const { gen2CanisterId } = useSelector((state) => state.authReducer || {});
    const [tokenThumbnail, setTokenThumbnail] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (Utils.isObjValid(gen2Token)) {
            setTokenThumbnail(`https://${gen2CanisterId}.raw.ic0.app/?type=thumbnail&tokenid=${gen2Token}`);
        }
    }, [gen2Token]);

    const displayToken = () => {
        return <Card key={gen2Token} style={{ margin: '10px', display: 'inline-block' }} class="h-100">
            <Card.Img src={tokenThumbnail} class='driverCardImage' style={{ objectFit: 'cover' }}>
            </Card.Img >
        </Card>
    }

    return (
        <WizardScreen fluid>
            <ConfettiEffect />
            <Row fluid>
                <Col>
                    <WizardScreenField>
                        Congratultions! Burn Completed! 🥳 You Are Now The Proud Owner Of A New Gen2.0 PokedBot!🤖
                    </WizardScreenField>
                </Col>
            </Row>
            <Row fluid>
                <Col>
                    <h4 style={{fontFamily:'Archivo Black'}}>
                        Our Reveal Day Is On: <span style={{fontFamily: 'Caveat'}}>January 31, 2023.</span> We'll See You There, Fam! 🤝
                    </h4>
                </Col>
            </Row>

            <Row style={{ margin: '20px' }} >
                <Col >
                    {displayToken()}
                </Col>
            </Row>
            <Row style={{ margin: '20px', marginBottom: '50px' }} >
                <Col >
                    <Button variant='primary' size='lg' onClick={() => {
                        // clear all credits and tokens info
                        dispatch(resetBurnParametersAsync());

                        // go to login screen
                        dispatch(setStepAsync('driver'));
                    }}>
                        <h3>Click Here To Burn More Bots!</h3>
                    </Button>
                </Col>
            </Row>
        </WizardScreen>
    );
}