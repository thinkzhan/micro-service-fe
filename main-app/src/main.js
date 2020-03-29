import Vue from 'vue';
import router from './router';
import store from './store';
import App from './app.vue';
import './plugins/use';
import 'style/index.scss';
import lib from 'lib/index';

import {
    registerMicroApps,
    runAfterFirstMounted
    // setDefaultMountApp,
    // start
} from 'qiankun';

Vue.config.devtools = true;

const props = {
    rootStore: store,
    rootLib: lib
};
// 主应用渲染函数
let app = null;
function render({ appContent, loading } = {}) {
    store.commit(
        'SET_INROOT',
        !location.pathname.startsWith('/app1') &&
            !location.pathname.startsWith('/app2')
    );

    if (!app) {
        app = new Vue({
            el: '#container',
            router,
            store,
            data() {
                return {
                    content: appContent,
                    loading
                };
            },
            render(h) {
                return h(App, {
                    props: {
                        content: this.content,
                        loading: this.loading
                    }
                });
            }
        });
    } else {
        app.content = appContent;
        app.loading = loading;
    }
}
render();
//注册子应用
registerMicroApps(
    [
        {
            name: 'module-app1',
            entry: '//localhost:9001',
            render,
            activeRule: genActiveRule('/app1'),
            props: props
        },
        {
            name: 'module-app2',
            entry: '//localhost:9002',
            render,
            activeRule: genActiveRule('/app2'),
            props: props
        }
    ],
    {
        beforeLoad: [
            app => {
                console.log('before load', app);
            }
        ],
        beforeMount: [
            app => {
                console.log('before mount', app);
            }
        ],
        afterUnmount: [
            app => {
                console.log('after unload', app);
            }
        ]
    }
);

// 设置默认子应用
// setDefaultMountApp("/app1");
// 第一个子应用加载完毕回调
runAfterFirstMounted(() => {
    // console.log(app)
});
// 启动微服务
// start({ prefetch: true });

// hide loading
window.document.getElementById('loading').style.display = 'none';

function genActiveRule(routerPrefix) {
    return location => location.pathname.startsWith(routerPrefix);
}
