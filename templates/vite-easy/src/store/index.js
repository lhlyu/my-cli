import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export const store = createStore({
    state () {
        return {
            count: 1
        }
    },
    mutations: {
    	add (state, payload) {
    		console.log('add 1')
    		state.count += 1
	    }
    },
    actions: {},
    modules: {},
    plugins: [createPersistedState({
        storage: window.sessionStorage,
        reducer (state) {
            return {
                count: state.count,
            }
        }
    })]
})