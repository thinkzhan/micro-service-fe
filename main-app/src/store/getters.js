const getters = {
    isInRoot: state => state['config'].isInRoot,
    adminInfo: state => state['user'].adminInfo,
    systemAuth: state => state['user'].systemAuth,
    config: state => {
        return {
            header: state['config'].header,
            nav: state['config'].nav
        };
    }
};

export default getters;
