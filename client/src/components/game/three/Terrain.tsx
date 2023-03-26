import { useEffect, useRef, useState } from 'react';

import { BufferAttribute } from 'three';
import { MeshReflectorMaterial } from '@react-three/drei';
import { Position } from './Scene';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useLoader } from '@react-three/fiber';
import { usePlane } from '@react-three/cannon';

export function Terrain() {
    const [ref] = usePlane(
        () => ({
            type: 'Static',
            rotation: [-Math.PI / 2, 0, 0],
        }),
        useRef(null),
    );

    const gridMap = useLoader(
        TextureLoader,
        process.env.PUBLIC_URL + '/textures/grid.png',
    );

    const aoMap = useLoader(
        TextureLoader,
        process.env.PUBLIC_URL + '/textures/grid.png',
    );

    const alphaMap = useLoader(
        TextureLoader,
        process.env.PUBLIC_URL + '/textures/alpha-map.png',
    );

    useEffect(() => {
        gridMap.anisotropy = 4;
    }, [gridMap]);

    const meshRef = useRef<any>(null);
    const meshRef2 = useRef<any>(null);
    useEffect(() => {
        var uvs = meshRef.current.geometry.attributes.uv.array;
        meshRef.current.geometry.setAttribute(
            'uv2',
            new BufferAttribute(uvs, 2),
        );

        var uvs2 = meshRef2.current.geometry.attributes.uv.array;
        meshRef2.current.geometry.setAttribute(
            'uv2',
            new BufferAttribute(uvs2, 2),
        );
    }, [meshRef.current]);

    const [coinPosition, setCoinPosition] = useState<Position>({
        x: 0,
        y: 12,
        z: 0,
    });
    useEffect(() => {
        if (!coinPosition) return;
        const onKeyPress = (e: any) => {
            if (!e.key) return;
            console.log(e.key);
            switch (e.key) {
                case 'w':
                    setCoinPosition({
                        ...coinPosition,
                        x: coinPosition.x + 0.5,
                    });
                    break;
                case 's':
                    setCoinPosition({
                        ...coinPosition,
                        x: coinPosition.x - 0.5,
                    });
                    break;
                default:
                    break;
            }
        };
        window.addEventListener('keydown', onKeyPress);
        return () => {
            window.removeEventListener('keydown', onKeyPress);
        };
    }, [coinPosition]);
    return (
        <>
            <mesh
                ref={meshRef2}
                position={[0, 0, 0]}
                rotation-x={-Math.PI * 0.5}
            >
                <planeGeometry args={[11, 32]} />
                <meshBasicMaterial
                    opacity={0.325}
                    alphaMap={gridMap}
                    transparent={true}
                    color={'white'}
                />
            </mesh>

            <mesh ref={meshRef} position={[0, 0, 0]}>
                <boxGeometry args={[100, 2, 100]} />
                <MeshReflectorMaterial
                    transparent={true}
                    color={[0.5, 0.5, 0.5]}
                    envMapIntensity={0.35}
                    metalness={0.05}
                    roughness={0.4}
                    dithering={true}
                    blur={[1024, 512]} // Blur ground reflections (width, heigt), 0 skips blur
                    mixBlur={3} // How much blur mixes with surface roughness (default = 1)
                    mixStrength={12} // Strength of the reflections
                    mixContrast={1} // Contrast of the reflections
                    resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
                    mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
                    depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
                    minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
                    maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
                    depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [bl
                    reflectorOffset={0.02} // Offsets the virtual camera that projects the reflection. Useful when the reflective
                />
            </mesh>
        </>
    );
}
