import { useContext, useEffect } from 'react';
import { SocketContext } from '../../socket/socket';
import { Data } from '../../../../types/types';
import { useAppDispatch } from '../../hooks/hooks';
import { gameReducer } from '../../store';

const CreateRoomButton = () => {
    const socket = useContext(SocketContext);
    const dispatch = useAppDispatch();
    const createRoom = () => {
        const data: Data = { roomName: 'Test' };
        socket.emit('createRoom', data);
    };
    useEffect(() => {
        socket.on('sendRoom', (data: Data) => {
            dispatch(gameReducer({ type: 'GAME_RECEIVED', game: data.room }));
            dispatch(gameReducer({ type: 'SET_CONNECTED' }));
        });
    }, []);

    return <button onClick={() => createRoom()}>Create game</button>;
};

export { CreateRoomButton };
