import {
    Environment,
    OrbitControls,
    PerspectiveCamera,
} from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';

import { Box } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { Terrain } from './Terrain';

export type Position = {
    x: number;
    y: number;
    z: number;
};
const Boxline = () => {
    const boxPositionArray: Position[] = [
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 2 },
        { x: 0, y: 0, z: 4 },
        { x: 2, y: 2, z: 2 },
    ];
    return (
        <>
            {boxPositionArray.map((pos: Position) => {
                return <Box position={[pos.x, pos.y, pos.z]} />;
            })}
        </>
    );
};
export function Scene() {
    const [lightState, switchLight] = useState<boolean>(true);

    useEffect(() => {
        const onKeyPress = (e: any) => {
            if (!e.key) return;
            console.log(e.key);
            switch (e.key) {
                case 'e':
                    switchLight(!lightState);
                    break;
                default:
                    break;
            }
        };
        window.addEventListener('keydown', onKeyPress);
        return () => {
            window.removeEventListener('keydown', onKeyPress);
        };
    }, [lightState]);
    return (
        <Suspense fallback={null}>
            <Environment
                files={process.env.PUBLIC_URL + '/textures/envmap.hdr'}
                background={true}
            />
            <Boxline />
            {lightState ? (
                <>
                    <ambientLight />
                    <mesh rotation={[0, 10, 0]}>
                        <boxGeometry attach="geometry" args={[1, 1, 1]} />
                        <meshStandardMaterial
                            attach="material"
                            color={'#6be092'}
                        />
                    </mesh>
                </>
            ) : (
                <></>
            )}
            <Physics>
                <Terrain />
            </Physics>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={30} />
            <OrbitControls target={[0, 0, 0]} />
        </Suspense>
    );
}
