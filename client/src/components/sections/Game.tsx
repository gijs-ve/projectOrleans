import { InGame, Lobby } from '.';

import { GameProp } from '../../../../types/types';

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
            <div className={'h-full'}>
                <InGame game={game} />
            </div>
        );
    }

    return <></>;
}
