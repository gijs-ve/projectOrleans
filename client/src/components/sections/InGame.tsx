import React from 'react';
import { GameProp } from '../../../../types/types';
import { OutputCanvas } from '../canvas';

export function InGame(p: GameProp) {
    const { game } = p;
    return (
        <div>
            <OutputCanvas
                game={game}
                className="gridCanvas"
                width={1200}
                height={1200}
            />
        </div>
    );
}
