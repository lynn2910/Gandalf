import Vue from 'vue'
import Vuex from 'vuex'
import UserService from "@/services/user.service";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            username: "Gemini",
            email: "gemini@gmail.com",
        },
        messages: []
    },
    mutations: {
        updateUser: (state, user) => {
            console.log("Updating user", user)
            state.user = user;
        },
        addMessage: (state, new_message) => {
            state.messages.push(new_message);
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
        async fetchUser({commit}) {
            let res = await UserService.getUser();
            if (!res.error) {
                commit("updateUser", res.data);
            } else {
                console.error(res.data)
            }
        },
        async logout({commit}) {
            let res = await UserService.logout();
            if (!res.error) {
                commit("updateUser", null);
            } else {
                console.error(res.data)
            }
        },
        async getMessages({commit}) {
            // TODO
            let messages = [
                {
                    username: "Alice",
                    content: "Salut tout le monde ! 👋",
                    timestamp: "2024-01-20T10:00:00Z"
                },
                {
                    username: "Bob",
                    content: "Hello Alice ! Comment ça va aujourd'hui ?",
                    timestamp: "2024-01-20T10:01:30Z"
                },
                {
                    username: "Alice",
                    content: "Super, merci ! Je suis en train de tester ce chat, c'est top !",
                    timestamp: "2024-01-20T10:02:00Z"
                },
                {
                    username: "Charlie",
                    content: "Salut ! Je me joins à la conversation. Ce chat a l'air cool 😎",
                    timestamp: "2024-01-20T10:03:15Z"
                },
                {
                    username: "Bob",
                    content: "Bienvenue Charlie !  Oui, c'est un bon exercice pour comprendre les websockets et OAuth2.",
                    timestamp: "2024-01-20T10:04:00Z"
                },
                {
                    username: "Alice",
                    content: "Absolument ! Et l'authentification avec Google est très pratique.",
                    timestamp: "2024-01-20T10:05:00Z"
                },
                {
                    username: "Charlie",
                    content: "Je suis d'accord.  Question : est-ce qu'on stocke l'historique des messages ?",
                    timestamp: "2024-01-20T10:06:30Z"
                },
                {
                    username: "Bob",
                    content: "Oui, l'historique est stocké dans MongoDB, comme spécifié dans les consignes.",
                    timestamp: "2024-01-20T10:07:00Z"
                },
                {
                    username: "Alice",
                    content: "Parfait, c'est rassurant de savoir que les conversations sont conservées.",
                    timestamp: "2024-01-20T10:08:00Z"
                },
                {
                    username: "Charlie",
                    content: "Ok, super ! Merci pour l'info Bob 👍",
                    timestamp: "2024-01-20T10:09:00Z"
                },
                {
                    username: "Jsp",
                    content: "C'est clairement de l'IA :)",
                    timestamp: "2025-03-06T14:08:47.151Z"
                }
            ];

            messages.forEach((m) => commit('addMessage', m));
        }
    },
})
