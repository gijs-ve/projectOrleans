import io, { Socket } from 'socket.io-client';

import { apiUrl } from '../config/constants';
import { createContext } from 'react';

export const socket: Socket = io(apiUrl, {
    transports: ['websocket'],
});
export const SocketContext = createContext(socket);
