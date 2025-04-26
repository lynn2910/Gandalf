import Vue from 'vue'
import Vuex from 'vuex'
import UserService from "@/services/user.service";
import ChatService from "@/services/chat.service";
import SocketService from "@/services/socket.service";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        chats: [],
        currentChat: null,
        users: [],
        loading: false,
        error: null
    },
    mutations: {
        updateUser: (state, user) => {
            console.log("Updating user", user)
            state.user = user;
        },
        setChats: (state, chats) => {
            state.chats = chats;
        },
        setCurrentChat: (state, chat) => {
            state.currentChat = chat;
        },
        addMessageToChat: (state, { chatId, message }) => {
            const chat = state.chats.find(c => c._id === chatId);
            if (chat) {
                chat.messages.push(message);
            }

            if (state.currentChat && state.currentChat._id === chatId) {
                state.currentChat.messages.push(message);
            }
        },
        setUsers: (state, users) => {
            state.users = users;
        },
        setLoading: (state, loading) => {
            state.loading = loading;
        },
        setError: (state, error) => {
            state.error = error;
        },
        addChat: (state, chat) => {
            state.chats.push(chat);
        }
    },
    actions: {
        async loginUser({commit}, {email, password}) {
            let res = await UserService.login(email, password);
            if (!res.error) {
                commit("updateUser", res.data?.user);
            } else {
                console.error(res.data)
            }
        },
        async registerNewUser({commit}, {email, password, username}) {
            let res = await UserService.register(username, email, password);

            if (!res.error) {
                commit("updateUser", res.data?.user);
            } else {
                console.error(res.data)
            }
        },
        async fetchUser({commit, dispatch}) {
            commit('setLoading', true);
            try {
                let res = await UserService.getUser();
                if (!res.error) {
                    commit("updateUser", res.data);

                    // Connect to socket when user is fetched
                    SocketService.connect();

                    // Fetch chats after user is authenticated
                    await dispatch('fetchChats');
                } else {
                    commit('setError', res.data);
                }
            } catch (error) {
                commit('setError', error.message);
            } finally {
                commit('setLoading', false);
            }
        },
        async logout({commit}) {
            commit('setLoading', true);
            try {
                let res = await UserService.logout();
                if (!res.error) {
                    commit("updateUser", null);
                    commit('setChats', []);
                    commit('setCurrentChat', null);

                    // Disconnect socket when user logs out
                    SocketService.disconnect();
                } else {
                    commit('setError', res.data);
                }
            } catch (error) {
                commit('setError', error.message);
            } finally {
                commit('setLoading', false);
            }
        },
        async fetchChats({commit}) {
            commit('setLoading', true);
            try {
                const res = await ChatService.getChats();
                if (!res.error) {
                    commit('setChats', res.data);
                } else {
                    commit('setError', res.data);
                }
            } catch (error) {
                commit('setError', error.message);
            } finally {
                commit('setLoading', false);
            }
        },
        async fetchChat({commit}, chatId) {
            commit('setLoading', true);
            try {
                const res = await ChatService.getChat(chatId);
                if (!res.error) {
                    commit('setCurrentChat', res.data);

                    // Join the chat room via socket
                    SocketService.joinChat(chatId);

                    // Listen for new messages
                    SocketService.onNewMessage(({chatId, message}) => {
                        commit('addMessageToChat', {chatId, message});
                    });
                } else {
                    commit('setError', res.data);
                }
            } catch (error) {
                commit('setError', error.message);
            } finally {
                commit('setLoading', false);
            }
        },
        async createChat({commit}, participantIds) {
            commit('setLoading', true);
            try {
                const res = await ChatService.createChat(participantIds);
                if (!res.error) {
                    commit('addChat', res.data);
                    return res.data;
                } else {
                    commit('setError', res.data);
                    return null;
                }
            } catch (error) {
                commit('setError', error.message);
                return null;
            } finally {
                commit('setLoading', false);
            }
        },
        async sendMessage({commit, state}, {chatId, content}) {
            try {
                const res = await ChatService.sendMessage(chatId, content);
                if (res.error) {
                    commit('setError', res.data);
                }
                // The message will be added via socket
            } catch (error) {
                commit('setError', error.message);
            }
        },
        async fetchUsers({commit}) {
            commit('setLoading', true);
            try {
                const res = await ChatService.getUsers();
                if (!res.error) {
                    commit('setUsers', res.data);
                } else {
                    commit('setError', res.data);
                }
            } catch (error) {
                commit('setError', error.message);
            } finally {
                commit('setLoading', false);
            }
        },
        // For backward compatibility with the current UI
        async getMessages({state, dispatch}) {
            if (state.currentChat) {
                return state.currentChat.messages;
            }
            await dispatch('fetchChats');
            if (state.chats.length > 0) {
                await dispatch('fetchChat', state.chats[0]._id);
                return state.currentChat?.messages || [];
            }
            return [];
        },
        async addMessage({dispatch, state}, newMessage) {
            if (state.currentChat) {
                await dispatch('sendMessage', {
                    chatId: state.currentChat._id,
                    content: newMessage.content
                });
            }
        }
    },
})
