import React from 'react';
import ReactDOM from 'react-dom';
import './resources/css/main.css';
import App from './App';

var insightsRenderDiv = document.getElementById('insights-react');

if (insightsRenderDiv){
    ReactDOM.render(<App />, insightsRenderDiv);
}


