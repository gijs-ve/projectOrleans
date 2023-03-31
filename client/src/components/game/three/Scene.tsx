import {
    Environment,
    OrbitControls,
    PerspectiveCamera,
} from '@react-three/drei';
import { Game, Player, Square } from '../../../../../types/types';
import { Suspense, useContext, useEffect, useRef, useState } from 'react';
import { getBorder, getSelf } from '../functions';

import { AmbientLight } from './Lights/AmbientLight';
import { BorderEntity } from './Entities/BorderEntity';
import { Box } from '@react-three/drei';
import { DirectionArrowEntity } from './Entities/DirectionArrowEntity';
import { Physics } from '@react-three/cannon';
import { PlayerEntity } from './Entities/PlayerEntity';
import { SocketContext } from '../../../socket/socket';
import { Terrain } from './Terrain';
import { Vector3 } from 'three';
import { getCamera } from '../functions/getCamera';
import { selectState } from '../../../store';
import { useSelector } from 'react-redux';

export type Position = {
    x: number;
    y: number;
    z: number;
};

const Players = (p: { game: Game }) => {
    const { game } = p;
    const { players, filledSquares } = game;
    const playerBoxes = players.map((player: Player) => {
        return { ...player.position, playerId: player.playerId };
    });
    const filteredBoxes = playerBoxes.filter((square: any) => {
        if (!square || typeof square === null) return false;
        return true;
    });
    const totalSquares = [...filledSquares, ...filteredBoxes];
    const boxPositionArray = totalSquares.map((square: any) => {
        if (!square) return { x: 0, y: 0, z: 0, color: 'none' };
        return { x: square.x, y: 2, z: square.y, color: square.playerId };
    });
    console.log(playerBoxes);
    return (
        <>
            {playerBoxes.map((player: any, index) => {
                return (
                    <DirectionArrowEntity
                        key={player.playerId}
                        pos={{ x: player.x, y: 2, z: player.y }}
                    />
                );
            })}
            {boxPositionArray.map((pos: any) => {
                let color = 'white';
                switch (pos.color) {
                    case 0:
                        color = 'red';
                        break;
                    case 1:
                        color = 'blue';
                        break;
                    case 2:
                        color = 'orange';
                        break;
                    case 3:
                        color = 'cadet blue';
                        break;
                    case 4:
                        color = 'crimson';
                        break;
                    case 5:
                        color = 'violet';
                        break;
                    default:
                        color = 'gold';
                        break;
                }
                return (
                    <>
                        <PlayerEntity color={color} pos={pos} />
                    </>
                );
            })}
        </>
    );
};

export const Border = (props: { roomSize: number }) => {
    const { roomSize } = props;
    const border = getBorder(roomSize);
    const borderBoxes = border.map((square: Square) => {
        return (
            <>
                <BorderEntity
                    pos={{
                        x: square.x,
                        y: square.y,
                        z: square.z ? square.z : 0,
                    }}
                />
            </>
        );
    });
    return <>{borderBoxes}</>;
};
export function Scene() {
    const socket = useContext(SocketContext);
    const [cameraState, switchCameraState] = useState<boolean>(false);
    const rawState = useSelector(selectState());
    const cameraRef = useRef();
    const { game } = rawState.gameState;

    useEffect(() => {
        const onKeyPress = (e: any) => {
            if (!e.key) return;
            switch (e.key) {
                case 'e':
                    switchCameraState(!cameraState);
                    break;
                default:
                    break;
            }
        };
        window.addEventListener('keydown', onKeyPress);
        return () => {
            window.removeEventListener('keydown', onKeyPress);
        };
    }, [cameraState]);
    if (!game) return <></>;
    const self = getSelf(game, socket.id);

    if (!self || !self.position) return <></>;
    if (!game) return <></>;
    const camera = getCamera(self, cameraState);
    if (!camera) return <></>;
    const selfVector = new Vector3(self.position.x, 1, self.position.y);
    return (
        <Suspense fallback={null}>
            <Environment
                files={process.env.PUBLIC_URL + '/textures/envmap.hdr'}
                background={true}
            />
            <Border roomSize={game.size} />
            <Players game={game} />

            <>
                {/* <directionalLight castShadow={true} position={[0, 222, 555]} /> */}
                {/* <mesh position={[0, 222, 555]} rotation={[0, 5, 0]}>
                    <boxGeometry attach="geometry" args={[1, 1, 1]} />
                    <meshStandardMaterial attach="material" color={'#6be092'} />
                </mesh> */}
            </>
            {/* <directionalLight
                castShadow={true}
                color={'#4FAB3A'}
                position={[0, 20, 100]}
                intensity={2}
            /> */}
            {/* <AmbientLight color={'#4FAB3A'} pos={{ x: 0, y: 15, z: 0 }} /> */}
            {/* <hemisphereLight
                color={'#FF0000'}
                groundColor={'#4FAB3A'}
                intensity={0.3}
            /> */}
            <spotLight
                color={'#4FAB3A'}
                intensity={1}
                position={[0, 300, 0]}
                distance={30}
                angle={Math.PI * 0.5}
                penumbra={0.25}
                decay={12}
            />
            <Physics>
                <Terrain />
            </Physics>

            <PerspectiveCamera
                onUpdate={(camera) => {
                    camera.lookAt(selfVector);
                }}
                makeDefault
                position={[camera?.x, camera?.y, camera.z]}
                fov={50}
                zoom={2}
            />
            <OrbitControls
                maxDistance={300}
                enableZoom={true}
                target={[self.position.x, 1, self.position.y]}
                enableRotate={true}
            />
            {/* {lightState && (
               
            )} */}
        </Suspense>
    );
}
