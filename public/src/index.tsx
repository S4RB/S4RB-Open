import App from './App';
import axios from 'axios';
import ENV from './ENV';
import registerServiceWorker from './registerServiceWorker';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';

axios.defaults.baseURL = ENV.baseUrl + ENV.APIVersion;

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
