import {
    Environment,
    OrbitControls,
    PerspectiveCamera,
} from '@react-three/drei';
import { Game, Player, Square } from '../../../../../types/types';
import { Suspense, useEffect, useState } from 'react';

import { BorderEntity } from './Entities/BorderEntity';
import { Box } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { PlayerEntity } from './Entities/PlayerEntity';
import { Terrain } from './Terrain';
import { getBorder } from '../functions/getBorder';
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

    return (
        <>
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
                        color = 'hotpink';
                        break;
                    case 3:
                        color = 'orange';
                        break;
                    case 4:
                        color = 'green';
                        break;
                    default:
                        color = 'white';
                        break;
                }
                return <PlayerEntity color={color} pos={pos} />;
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
                <BorderEntity pos={{ x: square.x, y: square.y, z: square.z }} />
            </>
        );
    });
    return <>{borderBoxes}</>;
};
export function Scene() {
    const [lightState, switchLight] = useState<boolean>(false);
    const rawState = useSelector(selectState());
    const { game } = rawState.gameState;

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
    if (!game) return <></>;
    return (
        <Suspense fallback={null}>
            <Environment
                files={process.env.PUBLIC_URL + '/textures/envmap.hdr'}
                background={true}
            />
            <Border roomSize={game.size} />
            <Players game={game} />
            {lightState ? (
                <>
                    <directionalLight
                        castShadow={true}
                        position={[0, 222, 555]}
                    />
                    <mesh position={[0, 222, 555]} rotation={[0, 5, 0]}>
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
