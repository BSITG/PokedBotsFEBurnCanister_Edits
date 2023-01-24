import * as React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux'
import { store } from './Store';
import ReactDOM from "react-dom/client";
import { App } from './App';

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
    <Provider store={store}>
      <App />
    </Provider >
);
