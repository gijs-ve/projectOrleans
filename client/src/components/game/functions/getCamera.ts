import { Player } from '../../../../../types/types';
import { Position } from '../three/Scene';

export const getCamera = (
    player: Player,
    cameraState: boolean,
): Position | null => {
    if (!player.position) return null;
    const cameraHeight: number = cameraState ? 15 : 3;
    const cameraOffsetBack: number = cameraState ? 0 : 13;
    const cameraOffsetHeight: number = cameraState ? 0 : 3;
    if (player.direction === 'Up') {
        return {
            x: player.position.x,
            y: cameraHeight + cameraOffsetHeight,
            z: player.position.y + cameraOffsetBack,
        };
    }
    if (player.direction === 'Right') {
        return {
            x: player.position.x - cameraOffsetBack,
            y: cameraHeight + cameraOffsetHeight,
            z: player.position.y,
        };
    }
    if (player.direction === 'Down') {
        return {
            x: player.position.x,
            y: cameraHeight + cameraOffsetHeight,
            z: player.position.y - cameraOffsetBack,
        };
    }
    if (player.direction === 'Left') {
        return {
            x: player.position.x + cameraOffsetBack,
            y: cameraHeight + cameraOffsetHeight,
            z: player.position.y,
        };
    }
    return null;
};
