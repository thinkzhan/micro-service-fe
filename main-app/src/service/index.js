/*
 * this.$serv
 */
import Proxy from 'lib/proxyService';
import API from 'api';
import Match from 'lib/match';

export default Proxy(
    {
        async getAdminInfo(params) {
            const resData = await API.getAdminInfo(params);
            return Match(resData, {
                userName: '{{userName}} || "-"'
            });
        }
    },
    API
);
