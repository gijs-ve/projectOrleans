import { Game, Player } from '../../../../../types/types';

export const getSelf = (game: Game, selfId: string) => {
    return game.players.find((player: Player) => player.id === selfId);
};
