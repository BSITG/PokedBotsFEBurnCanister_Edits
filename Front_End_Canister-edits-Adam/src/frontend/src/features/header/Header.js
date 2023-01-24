import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { logoutAsync } from '../auth/LoginThunk';
import { Container, Button, Image, Row, Col } from 'react-bootstrap';
import { PlugButton } from '../../controls/Controls';
import { resetBurnParametersAsync } from '../burn/BurnSlice'

export const Header = () => {
    const dispatch = useDispatch();
    const { walletType, status } = useSelector((state) => state.authReducer || {});
    const {  tokensBurned } = useSelector((state) => state.burnReducer || {})

    const PlugButtonLogic = () => {
        return <PlugButton size="lg"
            style={{ margin: "10px", fontWeight: '700', }}
            onClick={() => {
                dispatch(resetBurnParametersAsync());
                dispatch(logoutAsync());
            }}
        >
            <Row fluid>
                <Col xs='auto' style={{ padding: '0' }}>
                    <Image style={{ width: '50px' }} src='plug.png'></Image>
                </Col>
                <Col xs='auto' style={{ display: 'flex', alignItems: 'center' }}>
                    Logout
                </Col>
            </Row>
        </PlugButton>
    }

    const StoicButtonLogic = () => {
        return <Button variant="primary" size="lg"
            style={{ margin: "10px", background: '#228575', fontWeight: '700' }}
            onClick={() => {
                dispatch(resetBurnParametersAsync());
                dispatch(logoutAsync());
            }}
        >
            <Row>
                <Col xs='auto' style={{ padding: '0' }}>
                    <Image style={{ width: '50px' }} src='stoic.png'></Image>
                </Col>
                <Col xs='auto' style={{ display: 'flex', alignItems: 'center' }}>
                    Logout
                </Col>
            </Row>
        </Button>
    }

    return (
        <Container fluid style={{ backgroundImage: 'linear-gradient(black, #00000000)', textAlign: 'center' }}>
            {status === 'loggedIn' && <div><Row fluid>
                <Col xs={12} style={{ margin: 0, padding: 0, }} className="d-xs-block d-sm-block d-md-none" >
                    {walletType === 'plug' && <PlugButtonLogic />}
                    {walletType === 'stoic' && <StoicButtonLogic />}
                </Col>
                <Col xs={12} className="d-xs-block d-sm-block d-md-none" >
                    <Image src='poked-bots-logo.png' style={{ width: '13em', paddingTop: '15px' }}></Image>
                </Col>
            </Row>
            <Row fluid >
                <Col className="d-none d-md-block" style={{ marginLeft: '203px' }}>
                    <Image src='poked-bots-logo.png' style={{ width: '13em', paddingTop: '15px' }}></Image>
                </Col>
                <Col className="d-none d-md-block" style={{ margin: 0, }} sm='auto'>
                    <Row>
                        <Col style={{textAlign: 'right', padding: 0}}>
                            {walletType === 'plug' && <PlugButtonLogic />}
                            {walletType === 'stoic' && <StoicButtonLogic />}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5 style={{color:'white', fontFamily:'Caveat', fontSize: '2em'}}><b>Total Gen1 Bots Burned: <span style={{color: 'green', fontSize: '2.6em'}}>{tokensBurned}</span></b></h5>
                        </Col>
                    </Row>
                </Col>
            </Row>
            </div>}
            {status === 'loggedOut' && <Image src='poked-bots-logo.png' style={{ width: '13em', paddingTop: '15px' }}></Image>}
            <div style={{ margin: '10px', paddingBottom: '10px', fontFamily: 'impact' }}>
            <h2 style={{fontFamily: 'Unbounded', textShadow: '1px 1px 1px black'}}>
                <span style={{fontFamily: 'Caveat', fontWeight: 'heavy', color: 'white', textShadow: '2px 2px 2px black', fontSize: '1.5em'}}><em>
                The Official <span style={{textShadow: '2px 2px 2px black', color:'red', fontSize: '1.35em'}}><b>BURN</b></span> Canister for</em></span></h2>
                <h2 style={{color:'white', fontFamily: 'Caveat', textShadow: '2px 2px 2px black', fontSize:'4.8em'}}><em>Generation 2.0</em>
                : Rise of the <span style={{textShadow: '4px 4px 4px green', color: 'white'}}><b>Mutants!</b></span></h2>
            </div>
        </Container>
    );
}