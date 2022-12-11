import { useContext } from 'react';
import { SocketContext } from '../../socket/socket';

const StartButton = () => {
    const socket = useContext(SocketContext);
    const createRoom = () => {
        const data = { name: 'Test' };
        socket.emit('createRoom', data);
    };
    return <button onClick={() => createRoom()}>Create game</button>;
};

export { StartButton };
