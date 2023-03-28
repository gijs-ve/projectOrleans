import store, { setRooms } from './store';

import { Room } from '../types/types';
import { Socket } from 'socket.io';
import { createServer } from './socket/createServer';
//Functions
import { emitRoomToRoom } from './roomSystem';
import { onTick } from './gameSystem/onTick';

// HTTP Server setup
const { server, io } = createServer();
const cors = require('cors');
const PORT = 4000;

//Timer to keep track in all rooms
const raiseTimer = () => {
    try {
        const { rooms } = store.getState().roomState;
        store.dispatch(setRooms(onTick(rooms)));
        rooms.map((room: Room) => {
            emitRoomToRoom(room.id, io);
        });
    } catch (error) {
        console.log(error);
    }
};
setInterval(raiseTimer, 500);

const createRoom = require('./socket/createRoom');
const joinRoom = require('./socket/joinRoom');
const setDirection = require('./socket/setDirection');
const startRoom = require('./socket/startRoom');
const toggleSpectator = require('./socket/toggleSpectator');
const onDisconnect = require('./socket/onDisconnect');
const __resetRoom = require('./socket/tests/__resetRoom');

const onConnection = (socket: Socket) => {
    try {
        console.log(`User ${socket.id} connected`);
        createRoom(io, socket);
        joinRoom(io, socket);
        setDirection(io, socket);
        startRoom(io, socket);
        toggleSpectator(io, socket);
        onDisconnect(io, socket);
        __resetRoom(io, socket);
    } catch (error) {
        console.log(error);
    }
};
io.on('connect', onConnection);
server.listen(PORT, () => console.log(`listening on port ${PORT}`));
