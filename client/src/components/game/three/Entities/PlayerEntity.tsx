import { Box } from '@react-three/drei';
import { Position } from '../Scene';

export const PlayerEntity = (props: { color: string; pos: Position }) => {
    const { color, pos } = props;
    return (
        <Box
            castShadow
            receiveShadow
            material-color={color}
            position={[pos.x, pos.y, pos.z]}
        />
    );
};
