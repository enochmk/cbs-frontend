import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './assets/css/index.css';
import './assets/css/tailwind.css';

import App from './App';

const rootDev = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootDev);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
