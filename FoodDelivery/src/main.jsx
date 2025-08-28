import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { Provider } from 'react-redux'; // ✅ Important import
import { store } from './redux/Store.js';
import UserContext from './contexts/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <UserContext>
        <App />
      </UserContext>
    </Provider>
  </StrictMode>
);