import React from 'react';
import { useEffect, useReducer } from 'react';
import io, { Socket } from 'socket.io-client';
import {
    Game,
    ServerToClientEvents,
    ClientToServerEvents,
} from '../../types/types';
console.log(process.env);
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    process.env.REACT_APP_SERVER_URL || 'http://localhost:4000',
    {
        transports: ['websocket'],
        autoConnect: false,
    },
);

type Action =
    | { type: 'SET_CONNECTED' }
    | { type: 'SET_ERROR'; error: string }
    | { type: 'IX_RECEIVED'; ix: number }
    | { type: 'GAME_RECEIVED'; game: Game };

type State = {
    connected: boolean;
    error: string | null;
    playerIx: number | null;
    game: Game | null;
};

const initialState: State = {
    connected: false,
    error: null,
    playerIx: null,
    game: null,
};

const gameReducer = (state: State, action: Action) => {
    console.log(action);
    const { type } = action;
    switch (type) {
        case 'SET_CONNECTED':
            return { ...state, connected: true };
        case 'SET_ERROR':
            return { ...state, error: action.error };
        case 'GAME_RECEIVED':
            return { ...state, game: action.game };
        case 'IX_RECEIVED':
            return { ...state, playerIx: action.ix };
        default:
            return state;
    }
};

const Game = ({ id }: { id: string }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    useEffect(() => {
        socket.connect();
        socket.on('connect', () => {
            dispatch({ type: 'SET_CONNECTED' });
            socket.emit('register', id);
        });
        socket.on('error', (msg) =>
            dispatch({ type: 'SET_ERROR', error: msg }),
        );
        socket.on('receiveIx', (ix) => dispatch({ type: 'IX_RECEIVED', ix }));
        socket.on('game', (game) => dispatch({ type: 'GAME_RECEIVED', game }));
    }, [id]);

    // if (!state.game || state.playerIx === null || !state.error)
    //   return <p>Connection error: {state.error}</p>;
    if (!state.game || state.playerIx === null) return <p>Connecting..</p>;

    const { game, playerIx, error, connected } = state;

    return (
        <div>
            <p>
                Game {id} {connected ? 'Connected!' : 'Disconnected!'}
            </p>
            {error && <p>{error}</p>}
            <p>Your id: {playerIx}</p>
            <p>Players: {game.players.length}</p>
            <p>
                Now Playing:{' '}
                {game.state.phase === 'Pregame' ? 'Pregame' : 'not started'}
            </p>

            {game.state.phase === 'Preparing' && (
                <button onClick={() => socket.emit('start', id)}>Start!</button>
            )}
            {game.state.phase === 'InGame' && (
                <button onClick={() => socket.emit('roll', id)}>Roll!</button>
            )}

            {state.game.players.map(
                (player, i) =>
                    i !== playerIx && (
                        <div>
                            <span>
                                <h4>Player {i}</h4>
                            </span>
                        </div>
                    ),
            )}
        </div>
    );
};

export default Game;
