import socketIOClient from 'socket.io-client';

export const ENDPOINT = 'http://localhost:8000';

export const connectSocket = () => {
  console.log('connecting socket server');
  return socketIOClient(ENDPOINT);
};
