import { GameProp } from '../../../../types/types';
import { Lobby } from './Lobby';

export function Game(p: GameProp) {
    const { game } = p;
    if (game.phase === 'PreGame') {
        return <div>Game {game.id}</div>;
    }
    return <></>;
}
