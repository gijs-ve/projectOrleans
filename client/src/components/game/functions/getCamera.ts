import { Player } from '../../../../../types/types';
import { Position } from '../three/Scene';

export const getCamera = (player: Player): Position | null => {
    if (!player.position) return null;
    const cameraHeight: number = 6;
    const cameraOffsetBack: number = 5;
    const cameraOffsetHeight: number = 3;
    if (player.direction === 'Up') {
        return {
            x: player.position.x,
            y: cameraHeight + cameraOffsetHeight,
            z: player.position.y - cameraOffsetBack,
        };
    }
    if (player.direction === 'Right') {
        return {
            x: player.position.x + cameraOffsetBack,
            y: cameraHeight + cameraOffsetHeight,
            z: player.position.y,
        };
    }
    if (player.direction === 'Down') {
        return {
            x: player.position.x - cameraOffsetBack,
            y: cameraHeight + cameraOffsetHeight,
            z: player.position.y,
        };
    }
    if (player.direction === 'Left') {
        return {
            x: player.position.x - cameraOffsetBack,
            y: cameraHeight + cameraOffsetHeight,
            z: player.position.y,
        };
    }
    return null;
};
