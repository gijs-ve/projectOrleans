import './scale.css';

import { Data, GameProp } from '../../../../types/types';
import { useContext, useEffect } from 'react';

import { Canvas } from '@react-three/fiber';
import { Keys } from '../game/controler/Keys';
import { Scene } from '../game/three/Scene';
import { SocketContext } from '../../socket/socket';
import { gameReducer } from '../../store';
import { getCamera } from '../game/functions/getCamera';
import { getSelf } from '../game/functions';
import { useAppDispatch } from '../../hooks/hooks';

export function InGame(p: GameProp) {
    const { game } = p;

    const socket = useContext(SocketContext);
    const dispatch = useAppDispatch();
    useEffect(() => {
        socket.on('sendRoom', (data: Data) => {
            if (!data.room) return;
            dispatch(gameReducer({ type: 'GAME_RECEIVED', game: data.room }));
        });
        return () => {
            socket.off('sendRoom');
        };
    }, []);

    if (!game) return <></>;
    const self = getSelf(game, socket.id);
    console.log(self);
    if (!self || !self.position) return <></>;
    if (!game) return <></>;
    console.log('SELF', self);
    const camera = getCamera(self, true);
    console.log('CAMERA', camera);
    if (!camera) return <></>;
    return (
        <>
            <Keys roomId={game.id} />
            <Canvas shadows>
                <Scene />
            </Canvas>
        </>
    );
}
