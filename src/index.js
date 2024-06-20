import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/App';

import './css/reset.css';
import './css/styles.css';

const root = createRoot(document.querySelector('#root'));
root.render(<App />);
