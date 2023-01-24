import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createActorsAsync, loginSilentAsync,  } from './LoginThunk';
import {  setStepAsync } from '../wizard/WizardSlice';
import styled from 'styled-components';
import { Button, Image, Row, Col, Modal, Stack } from 'react-bootstrap';
import {WizardScreen, PlugButton, WizardScreenField} from '../../controls/Controls';

const ReadyToBurnText = styled.h1` 
  font-size: 4em;
  font-weight: 900;
  margin: auto;
  text-transform: uppercase;
  background: linear-gradient(219deg, 
    var(--color-1) 19%, 
    transparent 19%,transparent 20%, 
    var(--color-2) 20%, var(--color-2)  39%,
    transparent 39%,transparent 40%, 
    var(--color-3) 40%,var(--color-3) 59% ,
    transparent 59%,transparent 60%, 
    var(--color-4) 60%, var(--color-4) 79%,
    transparent 79%, transparent 80%, 
    var(--color-5) 80%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`

const PopupButton = styled.h4`
    margin: 10px;
    text-decoration: underline;
    cursor: pointer;
    &:hover {
        color: #186cb8;
    }
`

export const WalletConnect = () => {
    const dispatch = useDispatch()
    const { status, identity, walletType } = useSelector((state) => state.authReducer || {})
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        dispatch(loginSilentAsync());
    }, []);

    useEffect(() => {
        if (status === 'loggedIn') {
            dispatch(createActorsAsync({identity, walletType}));
            dispatch(setStepAsync('driver'));
            console.log(`Login Successful. Wallet Type: ${walletType}, Principal: ${identity.getPrincipal().toText()}`);
        }
        if (status === 'loggedOut') {
            console.log('Logged Out!');
        }
    }, [status]);

    return (
        <WizardScreen fluid>
            <ReadyToBurnText> Are You Ready To Burn? </ReadyToBurnText>
            <WizardScreenField>
                Connect Your Wallet
            </WizardScreenField>
            <Stack style={{ textAlign: "center" }} gap={3} >
                <div >
                    <PlugButton size="lg"
                        style={{ margin: "10px", fontWeight: '700' }}
                        onClick={() => {
                            dispatch(loginSilentAsync('plug'));
                        }}
                    >
                        <Row fluid>
                            <Col xs='auto' style={{ padding: '0' }}>
                                <Image style={{ width: '50px' }} src='plug.png'></Image>
                            </Col>
                            <Col xs='auto' style={{display: 'flex', alignItems: 'center'}}>
                                Plug Wallet
                            </Col>
                        </Row>
                    </PlugButton>
                    <Button variant="primary" size="lg"
                        style={{ margin: "10px", background: '#228575', fontWeight: '700' }}
                        onClick={() => {
                            dispatch(loginSilentAsync('stoic'));
                        }}
                    >
                        <Row fluid>
                            <Col xs='auto' style={{ padding: '0' }}>
                                <Image style={{ width: '50px' }} src='stoic.png'></Image>
                            </Col>
                            <Col xs='auto'  style={{display: 'flex', alignItems: 'center'}}>
                                Stoic Wallet
                            </Col>
                        </Row>
                    </Button>
                </div>
                <PopupButton style={{ textAlign: 'right', bottom: 0, margin: 0, paddingBottom: '25px' }} onClick={handleShow}>Read License Terms</PopupButton>
                <Modal show={show} onHide={handleClose} centered size="lg" style={{ fontSize: 'x-large' }}>
                    <Modal.Header closeButton>
                        <Modal.Title>License Terms</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>On the basis that seller royalty fees are paid the owner of an NFT in the Gen2 pokedbot “mutant army” collection has an exclusive right to display and trade the artwork and to utilise any playable characters generated from the source 3D files. They can display and  print the artworks and 3D models for personal use. The artwork can be used for promotional purposes by pokedstudio. All copyright in the pokedbots collections belongs to pokedstudio.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Stack>
        </WizardScreen>
    );
}