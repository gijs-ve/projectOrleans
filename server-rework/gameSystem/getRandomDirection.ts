import { Direction } from '../../types/types';
export const getRandomDirection = (): Direction => {
    const directions: Direction[] = ['Up', 'Right', 'Left', 'Down'];
    return directions[Math.floor(Math.random() * directions.length)];
};
