import { configureStore } from '@reduxjs/toolkit';

import gameStateReducer from './gameState/slice';

const store = configureStore({
    reducer: {
        gameState: gameStateReducer,
    },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
