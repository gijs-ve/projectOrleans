import { useContext } from 'react';
import { PlayerProp } from '../../../../types/types';
import { SocketContext } from '../../socket/socket';

export function Player(p: PlayerProp) {
    const socket = useContext(SocketContext);
    const { player } = p;
    return (
        <div>
            {player.name} {player.id === socket.id ? 'SELF' : 'NOT SELF'}
        </div>
    );
}
