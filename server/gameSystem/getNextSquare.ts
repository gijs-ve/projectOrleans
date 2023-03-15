import { Player, Square } from '../../types/types';

//takes a player, returns the next square for that player
export const getNextSquare = (player: Player): Square => {
    switch (player.direction) {
        case 'Up':
            return { x: player.position.x, y: player.position.y - 1 };
        case 'Right':
            return { x: player.position.x + 1, y: player.position.y };
        case 'Down':
            return { x: player.position.x, y: player.position.y + 1 };
        case 'Left':
            return { x: player.position.x - 1, y: player.position.y };
    }
};
