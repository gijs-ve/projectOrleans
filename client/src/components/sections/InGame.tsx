import React from 'react';
import { GameProp } from '../../../../types/types';
import { OutputCanvas } from '../canvas';
import './scale.css';

export function InGame(p: GameProp) {
    const { game } = p;
    return (
        <div className="scale">
            <OutputCanvas
                game={game}
                className="gridCanvas"
                width={1200}
                height={1200}
            />
        </div>
    );
}
