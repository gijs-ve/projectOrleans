import { ClientToServerEvents, ServerToClientEvents } from '../../types/types';

import { Server } from 'socket.io';

const express = require('express');
const server = require('http').createServer(express);

//Socket IO related
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server);
export type IO = typeof io;
export const createServer = () => {
    return { server, io };
};
