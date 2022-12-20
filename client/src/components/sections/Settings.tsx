import { useState, useContext, useEffect } from 'react';
import { GameProp, Data } from '../../../../types/types';
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
    const emitSettings = (type: string, setting: number) => {
        const data = { type, setting, roomId: game.id };
        socket.emit('setSettings', data);
    };
    useEffect(() => {
        socket.on('sendSettings', (data: Data) => {
            const { settings } = data;
            setSettings(settings);
        });
        return () => {
            socket.off('sendSettings');
        };
    }, []);
    const [settings, setSettings] = useState<any>(initialSettings);
    if (!settings) return <></>;
    if (game.hostId !== socket.id) {
        return (
            <>
                <h1>Size {`${settings.size}`}</h1>
                <h1>Max rounds {`${settings.maxRounds}`}</h1>
                <h1>Timer {`${settings.timelineTime}`}</h1>
                <h1>Timelines {`${settings.timelines}`}</h1>
            </>
        );
    }
    return (
        <>
            <h1>Size {`${settings.size}`}</h1>
            <input
                type="range"
                name="Size"
                min="9"
                max="45"
                onChange={(e) => {
                    setSettings({ ...settings, size: e.target.value });
                    emitSettings('size', Number(e.target.value));
                }}
            />
            <h1>Max rounds {`${settings.maxRounds}`}</h1>
            <input
                type="range"
                name="MaxRounds"
                min="1"
                max="25"
                onChange={(e) => {
                    setSettings({ ...settings, maxRounds: e.target.value });
                    emitSettings('maxRounds', Number(e.target.value));
                }}
            />
            <h1>Timer {`${settings.timelineTime}`}</h1>
            <input
                type="range"
                name="Timer"
                min="5"
                max="60"
                onChange={(e) => {
                    setSettings({ ...settings, timelineTime: e.target.value });
                    emitSettings('timelineTime', Number(e.target.value));
                }}
            />
            <h1>Timelines {`${settings.timelines}`}</h1>
            <input
                type="range"
                name="Timelines"
                min="1"
                max="8"
                onChange={(e) => {
                    setSettings({ ...settings, timelines: e.target.value });
                    emitSettings('timelines', Number(e.target.value));
                }}
            />
        </>
    );
};
