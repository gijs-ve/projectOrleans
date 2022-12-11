import { useContext } from 'react';
import { SocketContext } from '../../socket/socket';
import { Data, RoomProp } from '../../../../types/types';

const StartRoomButton = (p: RoomProp) => {
    const { roomId, hostId } = p;
    const socket = useContext(SocketContext);
    if (socket.id !== hostId) return <></>;
    const startRoom = () => {
        const data: Data = { roomId };
        socket.emit('startRoom', data);
    };

    return <button onClick={() => startRoom()}>Start game</button>;
};

export { StartRoomButton };
