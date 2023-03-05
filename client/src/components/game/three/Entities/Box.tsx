import { useRef, useState } from 'react';

import { useFrame } from '@react-three/fiber';

export const Box = (props: any) => {
    // This reference will give us direct access to the mesh
    const mesh = useRef<any>();
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
    // Subscribe this component to the render-loop, rotate the mesh every frame

    // useFrame((state, delta) => (mesh.current.rotation.x += delta / 3))
    // Return view, these are regular three.js elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={mesh}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
        >
            <boxGeometry args={[1, 0.2, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    );
};
