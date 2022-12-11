import io from 'socket.io-client';
import { createContext } from 'react';
import { apiUrl } from '../config/constants';

export const socket = io(apiUrl, {
    transports: ['websocket'],
});
export const SocketContext = createContext(socket);
