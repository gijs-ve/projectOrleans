import { useEffect, useContext } from 'react';
import { Data, GameProp } from '../../../../types/types';
import { SocketContext } from '../../socket/socket';
import { OutputCanvas } from '../canvas';
import { useAppDispatch } from '../../hooks/hooks';
import { gameReducer } from '../../store';
import './scale.css';

export function InGame(p: GameProp) {
    const { game } = p;
    const socket = useContext(SocketContext);
    const dispatch = useAppDispatch();
    useEffect(() => {
        socket.on('sendRoom', (data: Data) => {
            if (!data.room) return;
            dispatch(gameReducer({ type: 'GAME_RECEIVED', game: data.room }));
            dispatch(
                gameReducer({ type: 'PHASE_CHANGE', phase: data.room.phase }),
            );
        });
        return () => {
            socket.off('sendRoom');
        };
    }, []);
    return (
        <div className="scale">
            <div className="w-1/2"></div>
            <OutputCanvas
                game={game}
                className="items-center"
                width={1200}
                height={1200}
            />
        </div>
    );
}
