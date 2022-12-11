import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import { socket, SocketContext } from './socket/socket';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <SocketContext.Provider value={socket}>
            <App />
        </SocketContext.Provider>
    </Provider>,
    // </React.StrictMode>,
);

reportWebVitals();
