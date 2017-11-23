import ReactDOM from 'react-dom';
import React from 'react';

import App from './App';
import RegisterServiceWorker from './RegisterServiceWorker';

ReactDOM.render(
  React.createElement(App),
  document.getElementById('root'),
);

RegisterServiceWorker();

