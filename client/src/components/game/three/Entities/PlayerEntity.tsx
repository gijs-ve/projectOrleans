import { useRef, useState } from 'react';

import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import { Position } from '../Scene';

export const PlayerEntity = (props: { color: string; pos: Position }) => {
    const { color, pos } = props;
    return <Box material-color={color} position={[pos.x, pos.y, pos.z]} />;
};