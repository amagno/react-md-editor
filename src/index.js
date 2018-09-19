import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { verifyIsAccessToken } from './Lib/github-auth';



verifyIsAccessToken();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
