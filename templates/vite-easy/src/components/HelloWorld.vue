<template>
    <button @click="addHandler">count is: {{ state.count }}</button>
    <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
</template>

<script>
import { useStore } from 'vuex'

export default {
    name: 'HelloWorld',
    setup() {
        const store = useStore()
        const state = store.state
        const addHandler = () => {
            store.commit('add')
        }
        return {
            state,
            addHandler
        }
    }
}
</script>
