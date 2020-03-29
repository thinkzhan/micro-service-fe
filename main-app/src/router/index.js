import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/views/layout';
import interceptor from './interceptor';
Vue.use(VueRouter);

const router = new VueRouter({});

const routerConfs = [
    {
        path: '/demo',
        redirect: '/demo/list',
        name: '菜单',
        iconfont: '&#xe983;',
        component: Layout,
        children: [
            {
                path: 'list',
                name: '列表',
                component: () =>
                    import(/* webpackChunkName: "list" */ '../views/demo/list')
            },
            {
                path: 'detail',
                name: '详情',
                hidden: true,
                component: () =>
                    import(
                        /* webpackChunkName: "detail" */ '../views/demo/detail'
                    )
            }
        ]
    },
    {
        path: '/app1',
        name: 'app',
        moduleApp: true
    },
    {
        path: '/app2',
        name: 'app2',
        moduleApp: true
    }
];

interceptor(router, routerConfs);
export default router;
