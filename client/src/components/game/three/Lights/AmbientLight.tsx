import { Box } from '@react-three/drei';
import { Position } from '../Scene';

export const AmbientLight = (props: { color: string; pos: Position }) => {
    const { color, pos } = props;
    return (
        <ambientLight color={'#4FAB3A'} intensity={200} position={[0, 20, 0]} />
    );
};
