import { useRef, useState } from 'react';

import { Box } from '@react-three/drei';
import { Position } from '../Scene';
import { useFrame } from '@react-three/fiber';

export const BorderEntity = (props: { pos: Position }) => {
    const { pos } = props;
    return (
        <Box
            material-color={'black'}
            args={[1, 0.35, 1]}
            position={[pos.x, 1, pos.z]}
        />
    );
};
