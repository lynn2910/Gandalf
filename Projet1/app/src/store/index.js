import Vue from 'vue'
import Vuex from 'vuex'

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
        }
    },
})
