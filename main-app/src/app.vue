<template lang="pug">
    div#___root.admin-ui
        admin-ui-header(:config="config.header" @UICityChange="onUICityChange")
        div.admin-ui__container
            div.admin-ui__left
                admin-ui-nav(:config="config.nav")
            div.admin-ui__center
                router-view(v-if="isInRoot")
                div(v-else id="root-view" v-html="content")
</template>

<script>
export default {
    components: {
        'admin-ui-header': require('com/Header'),
        'admin-ui-nav': require('com/LeftNav')
    },
    props: {
        content: {
            default: '',
            type: String
        }
    },
    computed: {
        config() {
            return this.$store.getters.config;
        },
        isInRoot() {
            return this.$store.getters.isInRoot;
        }
    },
    methods: {
        onUICityChange(e) {
            console.log('onUICityChange', e);
        }
    }
};
</script>

<style lang="stylus">
.admin-ui
  &__container
    width 100%
    position relative
    height calc(100vh - 60px)
  &__left
    position absolute
    left 0
    top 0
    height 100%
    width 200px
    overflow scroll
  &__center
    width auto
    margin-left 200px
    height 100%
    padding 25px 20px 20px 25px
    box-sizing border-box
    overflow scroll
    -webkit-overflow-scrolling touch
</style>
