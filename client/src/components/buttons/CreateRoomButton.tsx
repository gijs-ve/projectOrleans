import { useContext } from 'react';
import { SocketContext } from '../../socket/socket';
import { Data } from '../../../../types/types';
import { useDispatch } from 'react-redux';
import { gameReducer } from '../../store';

const CreateRoomButton = () => {
    const socket = useContext(SocketContext);
    const dispatch = useDispatch();
    const createRoom = () => {
        const data: Data = { roomName: 'Test' };
        socket.emit('createRoom', data);
    };
    socket.on('sendRoom', (data: Data) => {
        dispatch(gameReducer({ type: 'GAME_RECEIVED', game: data.room }));
    });
    return <button onClick={() => createRoom()}>Create game</button>;
};

export { CreateRoomButton };
