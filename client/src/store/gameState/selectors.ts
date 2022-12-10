import { State } from '../../../../types/types';
export const selectState = () => (state: State) => state;
export const selectGame = () => (state: State) => state.game;
