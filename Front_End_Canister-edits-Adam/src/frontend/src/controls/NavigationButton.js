import React, { useEffect, useState } from 'react';
import { Container, Button, Image, Row, Col, Card, Stack } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export const NavigationButton = (props) => {
    return <Button size="lg" variant={props.disabled ? 'secondary' : 'primary'} disabled={props.disabled}
        style={{ margin: "10px", fontWeight: '700' }}
        onClick={() => {
            props.onClick();
        }}
    >
        <Row fluid>
            {props.direction === 'left' &&
                <Col xs='auto' style={{ padding: '0', paddingRight: '5px' }}>
                    <FontAwesomeIcon size="2x" icon={faChevronLeft} color="white" />
                </Col>}
            <Col xs='auto' style={{ display: 'flex', alignItems: 'center' }}>
                <h3>{props.label}</h3>
            </Col>
            {props.direction === 'right' &&
                <Col xs='auto' style={{ padding: '0', paddingRight: '5px' }}>
                    <FontAwesomeIcon size="2x" icon={faChevronRight} color="white" />
                </Col>}
        </Row>
    </Button>
}