import { useState, useEffect } from 'react';
import { CreateRoomButton } from '../buttons';

export function NoUserSection() {
    const [gameCode, setGameCode] = useState<string | null>(null);
    const [gameId, setGameId] = useState<string>('');
    return (
        <>
            <CreateRoomButton />
            <div>
                <input
                    value={gameId}
                    onChange={(e) => setGameId(e.target.value)}
                />
                <button onClick={() => setGameCode(gameCode)}>Join game</button>
            </div>
        </>
    );
}
