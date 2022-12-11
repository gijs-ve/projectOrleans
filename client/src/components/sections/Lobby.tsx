import React from 'react';
import { GameProp } from '../../../../types/types';
import { PlayerList } from '../playerList/PlayerList';

export function Lobby(p: GameProp) {
    const { game } = p;
    console.log(game);
    return (
        <div>
            <h1>ID:{game.id}</h1>
            <PlayerList players={game.players} hostId={game.hostId} />{' '}
        </div>
    );
}
