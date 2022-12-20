import { useState, useContext } from 'react';
import { GameProp } from '../../../../types/types';
import { SocketContext } from '../../socket/socket';

export const Settings = (p: GameProp) => {
    const { game } = p;
    const initialSettings = {
        size: game.size,
        maxRounds: game.maxRounds,
        timelineTime: game.timelineTime,
        timelines: game.timelines,
    };

    const socket = useContext(SocketContext);
    const [settings, setSettings] = useState<any>(initialSettings);
    return (
        <>
            <h1>Size {`${settings.size}`}</h1>
            <input
                type="range"
                name="Size"
                min="9"
                max="45"
                onChange={(e) =>
                    setSettings({ ...settings, size: e.target.value })
                }
            />
            <h1>Max rounds {`${settings.maxRounds}`}</h1>
            <input
                type="range"
                name="MaxRounds"
                min="1"
                max="25"
                onChange={(e) =>
                    setSettings({ ...settings, maxRounds: e.target.value })
                }
            />
            <h1>Timer {`${settings.timelineTime}`}</h1>
            <input
                type="range"
                name="Timer"
                min="5"
                max="60"
                onChange={(e) =>
                    setSettings({ ...settings, timelineTime: e.target.value })
                }
            />
            <h1>Timelines {`${settings.timelines}`}</h1>
            <input
                type="range"
                name="Timelines"
                min="1"
                max="8"
                onChange={(e) =>
                    setSettings({ ...settings, timelines: e.target.value })
                }
            />
        </>
    );
};
