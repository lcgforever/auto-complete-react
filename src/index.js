import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import './index.css';
import App from './component/app/App';
import combineReducers from './reducer/reducer';

ReactDOM.render(
    <Provider store={createStore(combineReducers)}>
        <App />
    </Provider>,
    document.getElementById('root'));
