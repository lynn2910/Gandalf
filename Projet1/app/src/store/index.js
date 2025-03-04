import Vue from 'vue'
import Vuex from 'vuex'
import UserService from "@/services/user.service";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
    },
    mutations: {
        updateUser: (state, user) => {
            console.log("Updating user", user)
            state.user = user;
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
        }
    },
})
