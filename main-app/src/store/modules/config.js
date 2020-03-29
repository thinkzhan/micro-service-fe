import headerConifg from '@/config/header';
export default {
    state: {
        header: {
            ...headerConifg,
            userName: ''
        },
        nav: [],
        isInRoot: true // 在主容器路由里
    },
    mutations: {
        SET_HEADER(state, header) {
            state.header = {
                ...state.header,
                ...header
            };
        },

        SET_NAV(state, nav) {
            state.nav = nav;
        },

        SET_INROOT(state, isInRoot) {
            state.isInRoot = isInRoot;
        }
    }
};
