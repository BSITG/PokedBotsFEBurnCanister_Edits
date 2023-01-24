import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Utils } from '../helpers/Utils';

const CheckMarkWrapper = styled.div`
    display: block;
    align-items: center;
    justify-content: center;
    margin: auto;
`

const CheckMarkCircle = styled.div`
    position: relative;
    background-image: ${props => props.type == 'error' ? 'linear-gradient(red, red)' : 'linear-gradient(to right, #cdab17, #dd7777, #d849b9, #a66fc4, #1cd4b4);'}; 
    border-radius: 100%;
    height: ${props => props.size == 'small' ? '50px' : '100px'};
    width: ${props => props.size == 'small' ? '50px' : '100px'};
`

const CheckMark = styled.div`
    position: absolute;
    transform: rotate(50deg) translate(-50%, -50%);
    left: ${props => props.size == 'small' ? '23%' : '27%'};
    top: ${props => props.size == 'small' ? '45%' : '43%'};
    height: ${props => props.size == 'small' ? '30px' : '60px'};
    width: ${props => props.size == 'small' ? '16px' : '25px'};
    border-bottom: ${props => props.size == 'small' ? '5px' : '10px'} solid #fff;
    border-right: ${props => props.size == 'small' ? '5px' : '10px'} solid #fff;
`

const CheckMarkCross1 = styled.div`
    position: absolute;
    transform: rotate(45deg) translate(-50%, -50%);
    left: 14%;
    top: 45%;
    height: 35px;
    width: 16px;
    border-right: 5px solid #fff;
`

const CheckMarkCross2 = styled.div`
    position: absolute;
    transform: rotate(135deg) translate(-48%, 48%);
    left: 55%;
    top: 45%;
    height: 35px;
    width: 16px;
    border-right: 5px solid #fff;
`

export const CheckMarkControl = (props) => {
    return <CheckMarkWrapper class='d-flex align-items-center'>
            <CheckMarkCircle size={props.size} type={Utils.isObjValid(props.type) ? props.type : 'success'}>
                { (!Utils.isObjValid(props.type) || props.type === 'success') && <CheckMark size={props.size}></CheckMark>}
            {(Utils.isObjValid(props.type) && props.type === 'error') && (
                <div>
                    <CheckMarkCross1 size={props.size} />
                    <CheckMarkCross2 size={props.size} />
                </div>
            )}
        </CheckMarkCircle>
        </CheckMarkWrapper>
}