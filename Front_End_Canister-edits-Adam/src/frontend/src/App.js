import React, { useEffect, useState } from 'react';
import './bootstrap.min.css';
import './BootstrapOverrides.css';
import './controls/ConfettiEffect.css';
import { WalletConnect, Header, Footer, Gen2Bot, SelectDriver, SelectBots, ConfirmBurn, Burn } from './features'
import { DarkTheme } from './themes/DarkTheme';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, getWizardIndexByStepName } from './globals/Global';
import Carousel from 'react-bootstrap/Carousel';
import { useSelector, useDispatch } from 'react-redux'
import {  setStepAsync } from './features/wizard/WizardSlice';

export const App = React.memo(() => {
    const dispatch = useDispatch()
    const { step } = useSelector((state) => state.wizardReducer || {})
    const [index, setIndex] = useState(0);
    const { status } = useSelector((state) => state.authReducer || {})

    useEffect(() => {
        setIndex(getWizardIndexByStepName(step));
    }, [step]);

    useEffect(() => {
        if (status === 'loggedOut') {
            dispatch(setStepAsync('login'));
            setIndex(getWizardIndexByStepName('login'));
        }
    }, [status]);

    return (
        <div class="d-flex flex-column" style={{ height: '100vh' }}>
            <ThemeProvider theme={DarkTheme}>
                <GlobalStyles />
                <Header />
                <Carousel controls={false} activeIndex={index}>
                    <Carousel.Item><WalletConnect /> </Carousel.Item>
                    <Carousel.Item><SelectDriver /> </Carousel.Item>
                    <Carousel.Item><SelectBots /> </Carousel.Item>
                    <Carousel.Item><ConfirmBurn /> </Carousel.Item>
                    <Carousel.Item><Burn /> </Carousel.Item>
                    <Carousel.Item><Gen2Bot /> </Carousel.Item>
                </Carousel>
                <div class="mt-auto">
                    <Footer ></Footer>
                </div>
            </ThemeProvider>
        </div>
    );
});