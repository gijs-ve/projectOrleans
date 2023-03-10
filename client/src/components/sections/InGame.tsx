import './scale.css';

import { Data, GameProp } from '../../../../types/types';
import { useContext, useEffect } from 'react';

import { Canvas } from '@react-three/fiber';
import { Keys } from '../game/controler/Keys';
import { Scene } from '../game/three/Scene';
import { SocketContext } from '../../socket/socket';
import { gameReducer } from '../../store';
import { useAppDispatch } from '../../hooks/hooks';

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
        <>
            <Keys roomId={game.id} />
            <Canvas>
                <Scene />
            </Canvas>
        </>
    );
}
