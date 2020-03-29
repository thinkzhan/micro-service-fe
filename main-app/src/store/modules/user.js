export default {
    namespaced: true,
    state: {
        adminInfo: {
            userName: '',
            email: '',
            id: ''
        },
        systemAuth: []
    },
    mutations: {
        SET_ADMIN_INFO(state, data, v) {
            state.adminInfo = Object.assign(state.adminInfo, data);
        },
        SET_SYS_AUTH(state, data) {
            state.systemAuth = Object.assign(state.systemAuth, data);
        }
    }
};
