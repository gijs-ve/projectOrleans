import { PlayerList, StartRoomButton } from '..';
import { Settings, SpectatorToggle } from '.';
import { useContext, useEffect } from 'react';

import { Data } from '../../../../types/types';
import { GameProp } from '../../../../types/types';
import { SocketContext } from '../../socket/socket';
import { gameReducer } from '../../store';
import { useAppDispatch } from '../../hooks/hooks';

export function Lobby(p: GameProp) {
    const { game } = p;
    const dispatch = useAppDispatch();
    const socket = useContext(SocketContext);
    useEffect(() => {
        socket.on('sendRoom', (data: Data) => {
            if (!data.room) return;
            dispatch(gameReducer({ type: 'GAME_RECEIVED', game: data.room }));
        });
        return () => {
            socket.off('sendRoom');
        };
    }, []);
    return (
        <div>
            <h1>{game.id}</h1>
            <PlayerList players={game.players} hostId={game.hostId} />{' '}
            <StartRoomButton hostId={game.hostId} roomId={game.id} />
            <Settings game={game} />
            <SpectatorToggle />
        </div>
    );
}
