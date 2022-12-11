import io, { Socket } from 'socket.io-client';
import { createContext } from 'react';
import { apiUrl } from '../config/constants';

export const socket: Socket = io(apiUrl, {
    transports: ['websocket'],
});
export const SocketContext = createContext(socket);
