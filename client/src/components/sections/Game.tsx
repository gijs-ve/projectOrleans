import { GameProp } from '../../../../types/types';
import { Lobby } from './Lobby';

export function Game(p: GameProp) {
    const { game } = p;
    if (game.phase === 'PreGame') {
        return (
            <div>
                <Lobby game={game} />
            </div>
        );
    }
    if (game.phase === 'Preparing') {
        return (
            <div>
                <Game game={game} />
            </div>
        );
    }

    return <></>;
}
