import Vue from 'vue';
import element from 'element-ui';
import authDirective from '../directive/auth';
import hasAuth from 'lib/hasAuth';
import TableSearch from 'com/TableSearch/TableSearch';
import Serv from 'serv';

Vue.config.devtools = true;
Vue.use(element);
Vue.component('TableSearch', TableSearch);

Vue.prototype.$serv = Serv;
Vue.prototype.$auth = function(action = 'add') {
    if (this.$route.meta && this.$route.meta.btnPermission) {
        return this.$route.meta.btnPermission[action];
    } else {
        return hasAuth();
    }
};
authDirective(Vue);
