import App from './app';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

const root = Object.assign(document.createElement('div'), {
    id: 'root'
});

render(
    <Router>
        <App />
    </Router>,
    document.body.appendChild(root)
);
