import { Position } from '../Scene';
import { Box, ScreenQuad } from '@react-three/drei';

export const DirectionArrowEntity = (props: { pos: Position }) => {
    const { pos } = props;
    return (
        <>
            <Box
                args={[1, 0.1, 0.2]}
                material-color={'blue'}
                position={[pos.x, pos.y + 0.6, pos.z]}
            />
            <Box
                args={[1, 0.1, 0.2]}
                material-color={'orange'}
                position={[pos.x + 0.2, pos.y + 0.6, pos.z - 0.2]}
            />
            <Box
                args={[1, 0.1, 0.2]}
                material-color={'orange'}
                position={[pos.x + 0.2, pos.y + 0.6, pos.z + 0.2]}
            />
        </>
    );
};
