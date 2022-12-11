import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { Game, Square, State, Action } from '../../../../types/types';

const initialState: State = {
    connected: false,
    error: null,
    playerIx: null,
    game: null,
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        gameReducer: (state: State, action: PayloadAction<Action>) => {
            const { type } = action.payload;
            switch (type) {
                case 'SET_CONNECTED':
                    state.connected = true;
                    break;
                case 'SET_ERROR':
                    state.error = action.payload.error;
                    break;
                case 'GAME_RECEIVED':
                    state.game = action.payload.game;
                    break;
                case 'PHASE_CHANGE':
                    console.log(current(state));
                    // if (!state.game) break;
                    // state.game.phase = action.payload.phase;
                    break;
                case 'ARENA_RECEIVED':
                    if (!state.game) break;
                    state.game.arena = action.payload.arena;
                    break;
                case 'IX_RECEIVED':
                    state.playerIx = action.payload.ix;
                    break;
                case 'SQUARE_RECEIVED':
                    console.log(state);
                    break;
                default:
                    return;
            }
        },
    },
});

export const { gameReducer } = gameSlice.actions;

export default gameSlice.reducer;
