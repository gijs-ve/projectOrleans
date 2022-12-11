import { useContext } from 'react';
import { SocketContext } from '../../socket/socket';

export const StartButton = () => {
    const socket = useContext(SocketContext);
    return <button></button>;
};
