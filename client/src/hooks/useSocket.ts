import { SocketContext } from '../socket/socket';
import { useContext } from 'react';

export const useSocket = () => {
    return useContext(SocketContext);
};
