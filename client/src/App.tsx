import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { CreateRoomButton } from './components';

function App() {
    const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';
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

export default App;
