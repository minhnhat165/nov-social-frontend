import { io } from 'socket.io-client';

const URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080';

const socket = io(URL, {
	autoConnect: false,
});

export default socket;
