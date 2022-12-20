import { GameProp } from '../../../../types/types';
import { Lobby, InGame } from '.';

export function Game(p: GameProp) {
    const { game } = p;
    if (game.phase === 'PreGame') {
        return (
            <div>
                <Lobby game={game} />
            </div>
        );
    }
    if (game.phase === 'Preparing' || game.phase === 'InGame') {
        return (
            <div>
                <InGame game={game} />
            </div>
        );
    }

    return <></>;
}
