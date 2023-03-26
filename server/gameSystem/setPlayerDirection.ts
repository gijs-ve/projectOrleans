import { KeyDirection, Player, Room, Rooms } from '../../types/types';
import store, { setRooms } from '../store';

export const setPlayerDirection = (
    roomId: string,
    socketId: string,
    keyDirection: KeyDirection,
): void => {
    const { rooms } = store.getState().roomState;
    store.dispatch(
        setRooms(
            rooms.map((room: Room) => {
                if (room.id !== roomId) return room;
                return {
                    ...room,
                    players: room.players.map((player: Player) => {
                        if (player.id !== socketId) return player;
                        let newDirection = null;
                        switch (keyDirection) {
                            case 'Left':
                                switch (player.direction) {
                                    case 'Up':
                                        newDirection = 'Left';
                                        break;
                                    case 'Right':
                                        newDirection = 'Up';
                                        break;
                                    case 'Down':
                                        newDirection = 'Right';
                                        break;
                                    case 'Left':
                                        newDirection = 'Down';
                                        break;
                                    default:
                                        break;
                                }
                                break;
                            case 'Right':
                                switch (player.direction) {
                                    case 'Up':
                                        newDirection = 'Right';
                                        break;
                                    case 'Right':
                                        newDirection = 'Down';
                                        break;
                                    case 'Down':
                                        newDirection = 'Left';
                                        break;
                                    case 'Left':
                                        newDirection = 'Up';
                                        break;
                                    default:
                                        break;
                                }
                                break;
                        }
                        if (!newDirection) return player;
                        return { ...player, direction: newDirection };
                    }),
                };
            }),
        ),
    );
};
