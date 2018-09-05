import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {store} from './store';
import { BrowserRouter, Route } from 'react-router-dom';
import App from "./components/App";

render(
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/" component={App} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);

