import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
Vue.use(Vuex);

function getModule(moduleContext) {
    const keys = moduleContext.keys();
    const modules = {};
    keys.forEach(item => {
        modules[
            item
                .split('/')
                .pop()
                .split('.')[0]
        ] = moduleContext(item).default;
    });
    return modules;
}

const store = new Vuex.Store({
    modules: getModule(require.context('./modules/', false, /\.js$/)),
    getters
});
export default store;
