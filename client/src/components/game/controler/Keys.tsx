import { useContext, useEffect } from 'react';
import { SocketContext } from '../../../socket/socket';

export const Keys = (props: { roomId: string }) => {
    const { roomId } = props;
    const socket = useContext(SocketContext);
    useEffect(() => {
        const onKeyPress = (e: any) => {
            if (!e.key) return;
            switch (e.key) {
                case 'a':
                    console.log('LEFT');
                    socket.emit('setDirection', {
                        roomId,
                        keyDirection: 'Left',
                    });
                    break;
                default:
                    socket.emit('setDirection', {
                        roomId,
                        keyDirection: 'Right',
                    });
                    break;
            }
        };
        window.addEventListener('keydown', onKeyPress);
        return () => {
            window.removeEventListener('keydown', onKeyPress);
        };
    }, []);
    return <></>;
};