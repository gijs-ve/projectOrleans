import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Game, Square, State } from '../../../../types/types';

type Action =
    | { type: 'SET_CONNECTED' }
    | { type: 'SET_ERROR'; error: string }
    | { type: 'IX_RECEIVED'; ix: number }
    | { type: 'GAME_RECEIVED'; game: Game }
    | { type: 'SQUARE_RECEIVED'; square: Square };

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
                    return;
                case 'SET_ERROR':
                    state.error = action.payload.error;
                    return;
                case 'GAME_RECEIVED':
                    state.game = action.payload.game;
                    return;
                case 'IX_RECEIVED':
                    state.playerIx = action.payload.ix;
                    return;
                case 'SQUARE_RECEIVED':
                    console.log(state);
                    return;
                default:
                    return;
            }
        },
    },
});

export const { gameReducer } = gameSlice.actions;

export default gameSlice.reducer;
