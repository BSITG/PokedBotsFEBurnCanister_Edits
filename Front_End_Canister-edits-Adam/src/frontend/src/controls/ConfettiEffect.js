import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Container} from 'react-bootstrap';

const ConfettiContainer = styled(Container)`
    user-select: none;
    z-index: 10;
    position: absolute;
`

const Confetti = styled.div`
    position: absolute;
    height: 100vw;
    display: flex;
    overflow: hidden;
    top: 0;
    left: 0;
`

const EffectElement = styled.i`
    width: 3rem;
    height: 3rem;
    margin: 0 0.2rem;
    animation-name: confetti;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-duration: calc(70s / ${props => props.speed});

    @keyframes confetti {
        0% {
          transform: translateY(-100vh);
        }
      
        100% {
          transform: translateY(100vh);
        }
      }
`

const SquareConfetti = styled(EffectElement)`
    width: 1rem;
    height: 1rem;
    background-color:  ${props => props.color};
    transform: rotate(-140deg);
`

const DodecagramConfetti = styled(EffectElement)`
    background: ${props => props.color};
    width: 0.8rem;
    height: 0.8rem;
    position: relative;

    &:before {
        content: "";
        height: 0.8rem;
        width: 0.8rem;
        background: ${props => props.color};
        transform: rotate(30deg);
        position: absolute;
        top: 0;
        left: 0;
    }

    &:after {
        content: "";
        height: 0.8rem;
        width: 0.8rem;
        background: ${props => props.color};
        transform: rotate(60deg);
        position: absolute;
        top: 0;
        left: 0;
    }
`

const RectangleConfetti = styled(EffectElement)`
    width: 1rem;
    height: 0.5rem;
    background-color:  ${props => props.color};
`

const HexagramConfetti = styled(EffectElement)`
    width: 0;
    height: 0;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
    border-bottom: 1rem solid ${props => props.color};
    position: relative;

    &:after {
        content: "";
        width: 0;
        height: 0;
        border-left: 0.5rem solid transparent;
        border-right: 0.5rem solid transparent;
        border-top: 1rem solid var(--bg);
        position: absolute;
        top: 0.33rem;
        left: -0.5rem;
      }
      
`

const PentagramConfetti = styled(EffectElement)`
    width: 0rem;
    height: 0rem;
    display: block;
    margin: 0.5rem 0;
    border-right: 1rem solid transparent;
    border-bottom: 0.7rem solid  ${props => props.color};
    border-left: 1rem solid transparent;
    transform: rotate(35deg);
    position: relative;

    &:before {
        content: "";
        width: 0;
        height: 0;
        display: block;
        border-bottom: 0.8rem solid  ${props => props.color};
        border-left: 0.3rem solid transparent;
        border-right: 0.3rem solid transparent;
        transform: rotate(-35deg);
        position: absolute;
        top: -0.45rem;
        left: -0.65rem;
    }
    
    &:after {
        content: "";
        width: 0rem;
        height: 0rem;
        display: block;
        border-right: 1rem solid transparent;
        border-bottom: 0.7rem solid  ${props => props.color};
        border-left: 1rem solid transparent;
        transform: rotate(-70deg);
        position: absolute;
        top: 0.03rem;
        left: -1.05rem;
    }
`

const WavyLineConfetti = styled(EffectElement)`
    position: relative;

    &:after,
    &:before {
    content: "";
    height: 1rem;
    width: 8rem;
    background-size: 2rem 1rem;
    position: absolute;
    left: -9rem;
    transform: rotate(90deg);
    }

    &:before {
        background-image: linear-gradient(
            45deg,
            transparent,
            transparent 50%,
            ${props => props.color} 50%,
            transparent 60%
        );
        top: 1rem;
    }

    &:after {
        background-image: linear-gradient(
            -45deg,
            transparent,
            transparent 50%,
            ${props => props.color} 50%,
            transparent 60%
        );
    }

`

export const ConfettiEffect = (props) => {
    return <ConfettiContainer>
        <Confetti>
            <SquareConfetti speed={18} color={'yellow'} />
            <PentagramConfetti speed={18} color={'white'} />
            <RectangleConfetti speed={29} color={'green'} />
            <HexagramConfetti speed={17} color={'blue'} />
            <PentagramConfetti speed={33} color={'red'} />
            <DodecagramConfetti speed={26} color={'yellow'} />
            <WavyLineConfetti speed={24} color={'pink'} />
            <WavyLineConfetti speed={5} color={'blue'} />
            <SquareConfetti speed={40} color={'white'} />
            <RectangleConfetti speed={17} color={'green'} />
            <SquareConfetti speed={25} color={'white'} />
            <RectangleConfetti speed={18} color={'green'} />
            <WavyLineConfetti speed={15} color={'yellow'} />
            <PentagramConfetti speed={32} color={'yellow'} />
            <SquareConfetti speed={25} color={'white'} />
            <RectangleConfetti speed={18} color={'green'} />
            <DodecagramConfetti speed={37} color={'yellow'} />
            <WavyLineConfetti speed={23} color={'pink'} />
            <DodecagramConfetti speed={37} color={'red'} />
            <WavyLineConfetti speed={37} color={'pink'} />
            <HexagramConfetti speed={36} color={'white'} />
            <WavyLineConfetti speed={32} color={'green'} />
            <PentagramConfetti speed={32} color={'yellow'} />
            <SquareConfetti speed={29} color={'white'} />
            <RectangleConfetti speed={18} color={'green'} />
            <DodecagramConfetti speed={37} color={'red'} />
            <WavyLineConfetti speed={23} color={'pink'} />
            <RectangleConfetti speed={30} color={'pink'} />
            <SquareConfetti speed={30} color={'red'} />
            <PentagramConfetti speed={18} color={'red'} />
            <RectangleConfetti speed={19} color={'green'} />
            <HexagramConfetti speed={16} color={'blue'} />
            <PentagramConfetti speed={23} color={'red'} />
            <HexagramConfetti speed={43} color={'red'} />
            <DodecagramConfetti speed={34} color={"yellow"} />
            <WavyLineConfetti speed={39} color={"pink"} />
            <SquareConfetti speed={40} color={"purple"} />
            <RectangleConfetti speed={21} color={"green"} />
            <SquareConfetti speed={14} color={"white"} />
            <RectangleConfetti speed={38} color={"green"} />
            <DodecagramConfetti speed={19} color={"red"} />
            <WavyLineConfetti speed={29} color={"pink"} />
            <HexagramConfetti speed={21} color={"white"} />
            <WavyLineConfetti speed={17} color={"purple"} />
            <PentagramConfetti speed={32} color={"yellow"} />
            <SquareConfetti speed={23} color={"white"} />
            <RectangleConfetti speed={18} color={"green"} />
            <DodecagramConfetti speed={37} color={"red"} />
            <WavyLineConfetti speed={48} color={"pink"} />
            <RectangleConfetti speed={38} color={"pink"} />
            <PentagramConfetti speed={13} color={"red"} />
            <DodecagramConfetti speed={49} color={"yellow"} />
            <WavyLineConfetti speed={19} color={"cyan"} />
            <SquareConfetti speed={15} color={"steelblue"} />
            <SquareConfetti speed={10} color={"yellow"} />
            <PentagramConfetti speed={18} color={"white"} />
            <RectangleConfetti speed={29} color={"green"} />
            <HexagramConfetti speed={17} color={"blue"} />
            <PentagramConfetti speed={33} color={"red"} />
            <DodecagramConfetti speed={26} color={"yellow"} />
            <WavyLineConfetti speed={24} color={"pink"} />
            <WavyLineConfetti speed={5} color={"white"} />
            <SquareConfetti speed={40} color={"purple"} />
            <RectangleConfetti speed={17} color={"green"} />
            <SquareConfetti speed={25} color={"white"} />
            <RectangleConfetti speed={18} color={"green"} />
            <WavyLineConfetti speed={15} color={"cyan"} />
            <PentagramConfetti speed={32} color={"yellow"} />
            <SquareConfetti speed={45} color={"white"} />
            <RectangleConfetti speed={18} color={"green"} />
            <DodecagramConfetti speed={37} color={"red"} />
            <WavyLineConfetti speed={23} color={"pink"} />
            <DodecagramConfetti speed={37} color={"red"} />
            <WavyLineConfetti speed={37} color={"pink"} />
            <HexagramConfetti speed={26} color={"white"} />
            <WavyLineConfetti speed={32} color={"cyan"} />
            <PentagramConfetti speed={32} color={"yellow"} />
            <SquareConfetti speed={45} color={"white"} />
            <RectangleConfetti speed={18} color={"green"} />
            <DodecagramConfetti speed={37} color={"red"} />
            <WavyLineConfetti speed={23} color={"pink"} />
            <RectangleConfetti speed={50} color={"pink"} />
            <SquareConfetti speed={30} color={"red"} />
            <PentagramConfetti speed={18} color={"red"} />
            <RectangleConfetti speed={19} color={"green"} />
            <HexagramConfetti speed={16} color={"blue"} />
            <PentagramConfetti speed={23} color={"red"} />
            <DodecagramConfetti speed={33} color={"yellow"} />
            <WavyLineConfetti speed={39} color={"white"} />
            <SquareConfetti speed={40} color={"orange"} />
            <RectangleConfetti speed={21} color={"green"} />
            <SquareConfetti speed={14} color={"white"} />
            <RectangleConfetti speed={38} color={"green"} />
            <DodecagramConfetti speed={19} color={"red"} />
            <WavyLineConfetti speed={29} color={"pink"} />
            <HexagramConfetti speed={34} color={"white"} />
            <WavyLineConfetti speed={17} color={"indigo"} />
            <PentagramConfetti speed={32} color={"yellow"} />
            <SquareConfetti speed={23} color={"white"} />
            <RectangleConfetti speed={18} color={"green"} />
            <DodecagramConfetti speed={37} color={"red"} />
            <WavyLineConfetti speed={48} color={"pink"} />
            <RectangleConfetti speed={38} color={"pink"} />
            <PentagramConfetti speed={13} color={"red"} />
            <DodecagramConfetti speed={49} color={"yellow"} />
            <WavyLineConfetti speed={19} color={"purple"} />
            <SquareConfetti speed={15} color={"cyan"} />
            <WavyLineConfetti speed={15} color={"cyan"} />
            <PentagramConfetti speed={32} color={"yellow"} />
            <SquareConfetti speed={45} color={"white"} />
            <RectangleConfetti speed={18} color={"green"} />
            <DodecagramConfetti speed={37} color={"red"} />
            <WavyLineConfetti speed={23} color={"pink"} />
            <DodecagramConfetti speed={37} color={"red"} />
            <WavyLineConfetti speed={37} color={"pink"} />
            <HexagramConfetti speed={26} color={"white"} />
            <WavyLineConfetti speed={32} color={"cyan"} />
            <PentagramConfetti speed={32} color={"yellow"} />
            <SquareConfetti speed={45} color={"white"} />
            <RectangleConfetti speed={18} color={"green"} />
            <DodecagramConfetti speed={37} color={"red"} />
            <WavyLineConfetti speed={23} color={"pink"} />
            <RectangleConfetti speed={50} color={"pink"} />
            <SquareConfetti speed={30} color={"red"} />
            <PentagramConfetti speed={18} color={"red"} />
        </Confetti>
    </ConfettiContainer>
}