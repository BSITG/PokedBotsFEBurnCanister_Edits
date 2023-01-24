import React  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons'
import {  Row, Col, Container } from 'react-bootstrap';

export const Footer = () => {
    return (
        // position: 'absolute', margin: 0, bottom: 0
        <Container   style={{ backgroundImage: 'linear-gradient(#00000000, black)', width: '100%', textAlign: 'center', }} fluid>
            <Row className="justify-content-md-center" style={{margin: '15px', display: '-webkit-inline-box'}}>
                <Col xs={'auto'}>
                    <FontAwesomeIcon size="2x" icon={faTwitter} color="white" onClick={() => { window.open('https://twitter.com/pokedstudiouk', '_blank'); }} />
                </Col>
                <Col xs={'auto'}>
                    <FontAwesomeIcon  size="2x" icon={faDiscord} color="white" onClick={() => { window.open('https://t.co/o6ZGggAvaJ', '_blank'); }} />
                </Col>
            </Row>
            <Row>
                <h5>©2023 By PokedStudio</h5>
            </Row>
        </Container>
    );
}