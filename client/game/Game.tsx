import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import {
    Game,
    ServerToClientEvents,
    ClientToServerEvents,
} from '../../types/types';
import { selectState } from '../src/store/gameState/selectors';
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    process.env.REACT_APP_SERVER_URL || 'http://localhost:4000',
    {
        transports: ['websocket'],
        autoConnect: false,
    },
);

const Game = ({ id }: { id: string }) => {
    const dispatch = useDispatch();
    const state = useSelector(selectState());

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
    if (!state || state.playerIx === null) return <p>Connecting..</p>;

    return (
        <div>
            <p>
                Game {id} {state.connected ? 'Connected!' : 'Disconnected!'}
            </p>
            {state.error && <p>{state.error}</p>}
            <p>Your id: {state.playerIx}</p>
            <p>Players: {state.game && state.game.players.length}</p>
            <p>
                Now Playing:{' '}
                {state.game && state.game.state.phase === 'Pregame'
                    ? 'Pregame'
                    : 'not started'}
            </p>

            {state.game && state.game.state.phase === 'Preparing' && (
                <button onClick={() => socket.emit('start', id)}>Start!</button>
            )}
            {state.game && state.game.state.phase === 'InGame' && (
                <button onClick={() => socket.emit('roll', id)}>Roll!</button>
            )}

            {state.game &&
                state.game.players.map(
                    (player, i) =>
                        i !== state.playerIx && (
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
