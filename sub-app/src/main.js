import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import './public-path';
import routes from './router';
import element from 'element-ui';

Vue.use(element);

Vue.config.devtools = true;

let router = null;
let instance = null;

export async function bootstrap({ rootStore, components, rootLib }) {
    Vue.prototype.$rootStore = rootStore;
    Vue.prototype.$rootLib = rootLib;
    // 注册主应用下发的组件
    components && Vue.use(components);
}

export async function mount({ data = {} } = {}) {
    router = new VueRouter({
        base: window.__POWERED_BY_QIANKUN__ ? '/app1' : '/',
        mode: 'history',
        routes
    });
    instance = new Vue({
        router,
        render: h => h(App, { props: data })
    }).$mount('#app');
}

export async function unmount() {
    instance.$destroy();
    instance = null;
    router = null;
}

// 单独开发环境
window.__POWERED_BY_QIANKUN__ || mount();

/* new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app"); */
