import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/css/index.css';
import './assets/css/tailwind.css';
import store from './app/store';
import App from './App';

const rootDev = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootDev);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
