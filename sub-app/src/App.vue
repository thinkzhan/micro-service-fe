/* eslint-disable */
<template>
    <div id="app">
        <div>
            <el-button-group class="right">
                <el-button
                    type="primary"
                    size="medium"
                    @click="routerSub('/about')"
                    >子模块内部路由</el-button
                >
                <el-button
                    type="primary"
                    size="medium"
                    @click="routerApp('/#demo')"
                    >外部路由</el-button
                >
                <el-button
                    type="primary"
                    size="medium"
                    @click="routerApp('/app2/about')"
                    >外部路由2</el-button
                >
            </el-button-group>
        </div>
        <div style="margin-top:20px">
            <el-button
                class="right"
                type="primary"
                size="medium"
                @click="callApp"
                >父子通信</el-button
            >
            <p>{{ msgVal }}</p>
        </div>
        <router-view />
    </div>
</template>

<script>
export default {
    data() {
        return {
            msgVal: this.adminInfo
        };
    },
    props: {
        adminInfo: Object // from props
    },
    methods: {
        routerSub(url) {
            this.$router.push(url);
        },
        routerApp(url) {
            this.$rootLib.route(url);
        },
        callApp() {
            const data = {
                userName: 1
            };
            this.$rootStore.commit('SET_HEADER', data);
            this.msgVal = data;
        }
    }
};
</script>
