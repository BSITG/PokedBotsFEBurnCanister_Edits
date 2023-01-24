import styled, { keyframes } from 'styled-components';
import { Card, Row, Col, Container, Button } from 'react-bootstrap';

export const WizardScreen = styled(Container)`
    text-align: center;
    background: #0000007a;
    border-radius: 5px;
    width: 90%;
    padding: 15px; 
}`

export const PlugButton = styled(Button)`
    background-image: linear-gradient(to right, #cdab17, #dd7777, #d849b9, #a66fc4, #1cd4b4);
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const CustomSpinner = styled.div`
  &:before {
    content: '';
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 6px solid #f6f;
    border-top-color: #0e0;
    border-right-color: #0dd;
    border-bottom-color: #f90;
    animation: ${rotate} 1s linear infinite;
    display: inline-block;
  }
`

export const ColoredText = styled.h2`
    background: red;
    background: -webkit-linear-gradient(to right, #ef5350, #f48fb1, #7e57c2, #2196f3, #26c6da, #43a047, #eeff41, #f9a825, #ff5722);
    background: -o-linear-gradient(to right, #ef5350, #f48fb1, #7e57c2, #2196f3, #26c6da, #43a047, #eeff41, #f9a825, #ff5722);
    background: -moz-linear-gradient(to right, #ef5350, #f48fb1, #7e57c2, #2196f3, #26c6da, #43a047, #eeff41, #f9a825, #ff5722);
    background: linear-gradient(to right, #ef5350, #f48fb1, #7e57c2, #2196f3, #26c6da, #43a047, #eeff41, #f9a825, #ff5722);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}`

export const WizardScreenField = styled.h1`
    font-size: 3em;
    margin: 15px;
`