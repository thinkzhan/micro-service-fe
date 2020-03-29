<template>
    <el-menu :router="false" :default-active="activePath" class="menu-bar">
        <template v-for="(item, index) in config">
            <template v-if="!item.hidden">
                <el-submenu
                    v-if="!item.txt && item.children && item.children.length"
                    :index="index + ''"
                    :key="index"
                >
                    <template slot="title">
                        <i
                            :class="item.iconCls || '' + 'icon icon2018'"
                            v-html="item.iconfont"
                        />
                        {{ item.name }}
                    </template>
                    <template v-for="(child, index2) in item.children">
                        <el-submenu
                            v-if="
                                !child.txt &&
                                    child.children &&
                                    child.children.length
                            "
                            :index="index + ''"
                            :key="index2"
                            @click="route(index + '', item)"
                        >
                            <template slot="title">
                                <i
                                    :class="
                                        child.iconCls || '' + 'icon icon2018'
                                    "
                                    v-html="child.iconfont"
                                />
                                {{ child.name }}
                            </template>
                            <el-menu-item
                                v-for="(child2, index2) in child.children"
                                v-show="!child2.hidden"
                                :index="
                                    item.path +
                                        '/' +
                                        child.path +
                                        '/' +
                                        child2.path
                                "
                                :key="index + '-' + index2"
                                class="third-layer item"
                                @click="
                                    route(
                                        item.path +
                                            '/' +
                                            child.path +
                                            '/' +
                                            child2.path,
                                        item
                                    )
                                "
                                >{{ child2.name }}</el-menu-item
                            >
                        </el-submenu>

                        <el-menu-item
                            v-else
                            v-show="!child.hidden"
                            :index="item.path + '/' + child.path"
                            :key="index + '-' + index2"
                            class="item"
                            @click="route(item.path + '/' + child.path, item)"
                            >{{ child.name }}</el-menu-item
                        >
                    </template>
                </el-submenu>
                <el-menu-item
                    v-else
                    :index="item.path"
                    :key="index"
                    @click="route(item.path, item)"
                >
                    <i
                        :class="item.iconCls || '' + 'icon icon2018'"
                        v-html="item.iconfont"
                    />
                    {{ item.name }}
                </el-menu-item>
            </template>
        </template>
    </el-menu>
</template>
<script>
export default {
    name: 'AdminUiNav',
    props: {
        config: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    computed: {
        activePath() {
            if (this.$route.meta && this.$route.meta.group) {
                return this.$route.meta.group;
            }
            if (this.$route.path === location.pathname) {
                return this.$route.path;
            }
            const pathname = location.pathname === '/' ? '' : location.pathname;
            const routPath = this.$route.path === '/' ? '' : this.$route.path;
            return pathname + routPath;
        }
    },
    methods: {
        route(url, item) {
            if (item.moduleApp) {
                window.history.pushState(item.meta, item.name || '', url);
            } else {
                window.history.pushState({}, item.name || '', '/#' + url);
            }
        }
    }
};
</script>

<style lang="scss">
.el-submenu .el-menu-item {
    padding-left: 45px !important;
}
.menu-bar .el-menu-item {
    background-color: #eceff4;
    min-width: auto !important;
}
.menu-bar .el-menu-item.is-active {
    background-color: #fff;
}
</style>

<style lang="scss" scoped>
.menu-bar {
    height: 100%;
}
.icon {
    margin-right: 8px;
    position: relative;
    top: -1px;
}
.icon.icon2018 {
    margin-right: 8px;
    position: relative;
    top: -1px;
    color: #48576a;
}
.third-layer {
    text-indent: 20px;
}
</style>
