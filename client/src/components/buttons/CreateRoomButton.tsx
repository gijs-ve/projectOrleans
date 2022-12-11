import { useContext } from 'react';
import { SocketContext } from '../../socket/socket';
import { Data } from '../../../../types/types';

const CreateRoomButton = () => {
    const socket = useContext(SocketContext);
    const createRoom = () => {
        const data: Data = { roomName: 'Test' };
        socket.emit('createRoom', data);
    };
    socket.on('sendRoom', (data: Data) => {
        console.log(data);
    });
    return <button onClick={() => createRoom()}>Create game</button>;
};

export { CreateRoomButton };
