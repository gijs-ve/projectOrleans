import { useContext } from 'react';
import { SocketContext } from '../../socket/socket';

export const SpectatorToggle = () => {
    const socket = useContext(SocketContext);
    return (
        <button onClick={() => socket.emit('toggleSpectator')}>
            Toggle spectator
        </button>
    );
};
