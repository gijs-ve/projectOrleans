import { useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
    const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';
    const [gameCode, setGameCode] = useState<string | null>(null);
    const [gameCodeInp, setGameCodeInp] = useState<string>('');
    const requestGame = async () => {
        const idResponse = await axios.get(`${API_URL}/game`);
        setGameCode(idResponse.data.id);
    };

    return (
        <>
            <button onClick={() => requestGame()}>Start new game</button>
            <div>
                <input
                    value={gameCodeInp}
                    onChange={(e) => setGameCodeInp(e.target.value)}
                />
                <button onClick={() => setGameCode(gameCodeInp)}>
                    Join game
                </button>
            </div>
        </>
    );
}

export default App;
