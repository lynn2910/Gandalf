import { io } from 'socket.io-client';

const SOCKET_URL = process.env.VUE_APP_SOCKET_URL || 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
    this.connected = false;
  }

  connect() {
    if (this.socket) return;

    this.socket = io(SOCKET_URL, {
      withCredentials: true,
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket.id);
      this.connected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
      this.connected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      this.connected = false;
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
    }
  }

  joinChat(chatId) {
    if (!this.socket || !this.connected) {
      console.error('Socket not connected');
      return;
    }
    this.socket.emit('join-chat', chatId);
  }

  sendMessage(chatId, message) {
    if (!this.socket || !this.connected) {
      console.error('Socket not connected');
      return;
    }
    this.socket.emit('send-message', { chatId, message });
  }

  onNewMessage(callback) {
    if (!this.socket) {
      console.error('Socket not initialized');
      return;
    }
    this.socket.on('new-message', callback);
  }

  offNewMessage() {
    if (!this.socket) return;
    this.socket.off('new-message');
  }

  onOnlineUsersUpdated(callback) {
    if (!this.socket) {
      console.error('Socket not initialized');
      return;
    }
    this.socket.on('online-users-updated', callback);
  }

  offOnlineUsersUpdated() {
    if (!this.socket) return;
    this.socket.off('online-users-updated');
  }
}

export default new SocketService();
