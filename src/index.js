import App from './app';
import React from 'react';
import css from './styles.less';
import { store } from './store';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const root = Object.assign(document.createElement('div'), {
    id: css.root
});

render(
    <Provider store={ store }>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.body.appendChild(root)
);
