import { configureStore } from '@reduxjs/toolkit';
import { findRenderedComponentWithType } from 'react-dom/test-utils';

import gameStateReducer from './gameState/slice';

const store = configureStore({
    reducer: {
        gameState: gameStateReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export * from './gameState';
export default store;
