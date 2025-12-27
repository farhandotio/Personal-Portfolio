import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './app/store.js';
import { Analytics } from '@vercel/analytics/react';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <Analytics />
  </Provider>
);
