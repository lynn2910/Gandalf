import Vue from 'vue'
import Vuex from 'vuex'
import UserService from "@/services/user.service";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {
            username: "Marvyn",
            email: "Marvyn@gmail.com",
        },
    },
    mutations: {
        updateUser: (state, user) => {
            state.user = user;
        }
    },
    actions: {
        async loginUser({commit}, {login, password}) {
            // TODO
            let res = await UserService.login(login, password);
            if (!res.error) {
                commit("updateUser", res.data);
            } else {
                console.error(res.data)
            }
        },
        async registerNewUser({commit}, data) {
            let res = await UserService.register(data);

            if (!res.error) {
                commit("updateUser", res.data);
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
        }
    },
})
