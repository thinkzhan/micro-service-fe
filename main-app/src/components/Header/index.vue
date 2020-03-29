/* eslint-disable */
<template>
    <div class="admin-header">
        <div class="title-wrap">
            <a :href="config.mainUrl" target="_blank" class="site-logo">
                <img src="./imgs/logo.png" />
            </a>
            <span class="title-separate" />
            <a :href="config.siteUrl" class="header-title">{{
                config.siteName
            }}</a>
        </div>
        <div v-if="config.showCityUI" class="city-form-outter">
            <el-form :inline="true" class="city-select" label-width="50px">
                <el-form-item label="省份:">
                    <el-select
                        v-model="provinceId"
                        style="width: 120px; height: 36px"
                    >
                        <el-option
                            v-for="item in provinceList"
                            :label="item.provinceName"
                            :key="item.provinceId"
                            :value="item.provinceId"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="城市:">
                    <el-select
                        v-model="cityId"
                        :disabled="!provinceId"
                        style="width: 120px; height: 36px"
                    >
                        <el-option
                            v-for="item in cityList"
                            :label="item.cityName"
                            :value="item.cityId"
                            :key="item.cityId"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div class="user-wrap">
            <a :href="config.platformUrl" class="admin-url">
                <span class="admin-text">返回统一后台</span>
            </a>
            <span class="admin-separate" />
            <span class="user-logo" />
            <span class="user-name">{{ config.userName }}</span>
            <a :href="config.logoutUrl" class="logout">安全退出</a>
        </div>
    </div>
</template>

<script>
const sfax = require('sfax');

export default {
    name: 'AdminUiHeader',
    props: {
        config: {
            type: Object,
            default() {
                return {
                    mainUrl: 'https://house.focus.cn/',
                    siteUrl: '',
                    siteName: '管理后台',
                    platformUrl: ``,
                    logoutUrl: ``,
                    userName: ``,
                    showCityUI: false
                };
            }
        }
    },
    data() {
        return {
            provinceList: [],
            cityList: [],
            provinceId: '',
            cityId: ''
        };
    },
    watch: {
        provinceId(val) {
            if (val) {
                this.getCity(true);
            }
        },
        cityId(val) {
            if (val) {
                if (window.localStorage) {
                    localStorage.setItem('@admin_ui_province', this.provinceId);
                    localStorage.setItem('@admin_ui_city', this.cityId);
                }
                this.$emit('UICityChange', {
                    provinceId: this.provinceId,
                    cityId: this.cityId
                });
            }
        }
    },
    created() {
        if (this.config.showCityUI) {
            if (window.localStorage && localStorage.getItem('@admin_ui_city')) {
                this.getProvince().then(() => {
                    this.provinceId = +localStorage.getItem(
                        '@admin_ui_province'
                    );
                    this.cityId = +localStorage.getItem('@admin_ui_city');
                });
            } else {
                this.getProvince(true);
            }
        }
        // this.getCity();
    },
    methods: {
        req(url, payload, config, type = 'get') {
            return sfax({
                url,
                data: payload,
                type: type,
                withCredentials: false,
                ...config
            });
        },
        getProvince(set) {
            return this.req('//house-sv-base.focus.cn/city/province').then(
                res => {
                    if (res.code == 1) {
                        this.provinceList = res.data;
                        if (set) {
                            this.provinceId = this.provinceList[0].provinceId;
                        }
                    }
                }
            );
        },
        getCity(set) {
            return this.req('//house-sv-base.focus.cn/city/list', {
                provinceId: this.provinceId
            }).then(res => {
                if (res.code == 1) {
                    this.cityList = res.data;
                    if (set) {
                        this.cityId = this.cityList[0].cityId;
                    }
                }
            });
        }
    }
};
</script>

<style scoped lang="scss">
.admin-header {
    width: 100%;
    height: 60px;
    background: #334055;
    color: #fff;
    font-size: 14px;
    overflow: hidden;

    .title-wrap {
        float: left;
        overflow: hidden;
        .site-logo {
            float: left;
            margin-left: 20px;
            margin-top: 12px;
        }
        .title-separate {
            float: left;
            width: 1px;
            height: 19px;
            background: #fff;
            margin: 20px 13px 0 9px;
            opacity: 0.59;
        }
        .header-title {
            float: left;
            font-size: 18px;
            margin-top: 18px;
            line-height: 24px;
            color: #fff;
            text-decoration: none;
        }
    }

    .user-wrap {
        float: right;
        overflow: hidden;
        .admin-url {
            float: left;
            padding: 0 10px;
            width: 121px;
            height: 40px;
            margin: 10px 20px 0 0;
            // eslint-disable-next-line
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI0AAAAoCAYAAADDj3n4AAAABGdBTUEAALGPC/xhBQAAA8dJREFUeAHtnM1PE0EUwHfeznZbgSJCYwJR/ICgUTjxB9AriScTDgYOHBS9ePJu/SuUgyeNh968cIU/wIuCCQQ0giISLC0U2m53dtbOxmm27dovaUK7r5c3++bN7s6vL/O1b4YoTf7i8c+BJKNh0CGYO81omqpRS6XU5iY0eUss1iICAQCTWSpTNZMxRclnciz9bG4iQwixm3kkaaTQ8rJN15NfLnFmhG2m6I2URdvzRUBTqMWpkoZQOrlwbzLTyNvV5TTxeFxN5Mb6eSDUjy1JI3jbw9ZiSpoMBPafTo8a9bxxTad5u7QZTqayg0RR1XpuiDbtS0CzyOGj2du/anVb/3Qa27bJqzefIhalkfbFgG/eKAGbqplEZO97LBotDH+8f55OE4vZEBlbG7JtCHsXQ21HEygMnLuywZ35+es5r3pWzHREC4MO44XKRzrOtWyXMby4+EHzqnWF04guCVsYL1T+0nFmUaNXvyp6nfKalyjEoBfHMOWI/HsNHIJD41uD5QSKTiOm1WKWVG6A1/4mYBj53tfv13vcFIpOI9ZhcFrtRoNpSSBnWJfFWFdeO04jVnrFwp1UokQCbgJi9f/lu9WLUuc4zce9NVzplURQehIAhQ7IDMdpNAolfZbMRIkEJAFG7MDS0qbzvRHE12r8+CjRoKxGYOsk7Sz2gghvqGaIeUhAEqBmt9MjgYiHkUqUSKAaAdBIUMyiQARQVTPEPCQgCTCWJy9WVlQQEXdSiRIJ1CIwrFyjIEI0axliPhKQBPhXQyuuCEslSiRQiwColog1xh8SqI8A3NBNMC0TnaY+XmhVILCtfGMQ7LpgIg0kUA8BSgP286kpC7jBPUP66rkJ2viLADftnAg6hz7Kjv1VdaxtswSYdpIWZWFm5k6eUKWu/S7NPgzLdQaBke4ep4FxptxAdWxtOuN/bVktqE3y03830zlOc6vv5iEBjbfsiXjjtifAFfZbVsJxmmiUMMhnE1KJEgm4CYjhy5MH4ympK64I9wc3ErZiWTIDJRKQBIK6uu/eqlsMFhYGYgtLKpW/Io1RIgFdDxw9vD/6w02i2NII5ez06LHK2IHbANP+JcCB53ZXR36WEyhxGpH5eG7igBCOs6lyUj67Bqoy/cjYicVIxQSpwmlE33WwcXcXHcdnXuKubuEAgNCpvr2wMOn5ialkTOMuh0eNuGn4J930USNuRHiokZtGZ6f/+1AjNx48Ps1No/PSZ358mhuR2L4rdmOKzXW4V8pNpv3SLT+o0QsJHgnrReV86kBEZ0LIPKsjYf8As2xgc35JbScAAAAASUVORK5CYII=)
                no-repeat;

            .admin-text {
                float: left;
                padding-left: 34px;
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABGdBTUEAALGPC/xhBQAAArxJREFUSA2llt1LFFEYh50s06JsAyUX+lrQu3AFS0wk3KiryCAogqCIiujG6zSsqz7+BbXurJvKpaybqGDF1sKLIvqgD7JwJTI0sItAa31+4zrMzpnZdvIHD+ec933P++45c+bMWiUFlM1mK3DvhQNQD1GIwHeYgGFIqrUs6w+tryw/K8nLsJ+F81AJKRgCJZ6GatgEe6AB3sM5Ct2h/bcoUAtvYAYuwPpCs/BvhWswBw9APypYBLTCFKRgQ3Ck6SG+AcbgLWiVpnBoBSrQD9qu0GJeFYzCS1idlwBDGWiLhtTPc4YcML8GMnAjbyqGDtAzqMlz/OeAPAmQdtop6FTAJFwMyolvBZwCnbiiRKwOwRM7mE47zIJxirAp+Un4DNKVoioQROxu+AtRDa7DI/dkxha4kzO0pRW/yvGUth9OQKl7vvrYlsM0nFnGOA560RzxUmUZvIDXjnGhozdddpGBOuiDEZKtpHVEjjkGaYir4jc47Xg9HXyNMAiSsV3YdoAOTbdnqnL3wl2tRHeRrgpf8YtGYR/O7TDiDcL3HFsPJLw+xj8hoiLagiooqFyxZEDQF+xbfHzKO6kiE7DRJyCMaRvB4z4TlDejIno4uk1Di/3WKTzMxOPw2J0Au64VvYxpBbXlAjazJV89gY2ML7ttrv4q+jHQRarnsov5v2ltkfcgnZtQrZWk4BN0QRhNEXwLjkCzp4C+U52QxK6Hb784h6is74H2dskizzHQLVLrJGOgbXsIH8G4XpzAIjrMj8MvuGSEY4zAB0iDPq+hxbx6GIf7oEdhCkcM9F0ZgxYzIthC/FHQCnT7rgmOxEPAWhgA6Ta0gO+vwl4O++EZ6JleBSNWp8BXBCdwaF+bQLfCMOhS1GlZ/LfSSr8c7oH+rbyjNRRYZDGSYjH67RCHKKwDFdVNocKDJP9BG6h5KVAl7vWI/3YAAAAASUVORK5CYII=)
                    no-repeat left center;
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                color: #fff;
            }
        }

        .admin-separate {
            float: left;
            width: 1px;
            height: 40px;
            background: #6f7887;
            margin: 10px 20px 10px 0;
        }

        .user-logo {
            float: left;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAABGdBTUEAALGPC/xhBQAAAX5JREFUOBHNlL8vQ1EUx/uqoSEiNagEpS9GiTBIxMRgkVgM7GLRv0CsGCqxiclkEUaDQRBdJAZTF4tBYpFIDAwsz+dc9zR1349ouzjJJ+ec7zn39N7b956XSrAgCHKUt8C3bZ/4Hc/z7mzemJOBcAPTupK4F05gUbWGPAv3oTZQF6N1wLV41VyfdoW63OeYt3W5CdHkCiow7tY0TxqqPVH+EVHvOVRvdmjAJC80zQrNDo2bZ/R/NXSALT3HbTdpp688NqPuQjS5yzm4d2uxOYsmYAqG4QoGtZk4A2UogbwISxD6w2oCxTYW70IP+LAK7VCGL3iHAhzCMZzCA0zCGs/vE/63MfQIVkTFF6ACCzbvJM7beIT4DLRX8ksYkrqY2SlCiTjHr8nHwxhaF8EGzIDs4gOK8Abb9FbxxugdI9hDm1dBdnEBcvxIo5aHImQiGxCpbcLPh4ZgGdbjmv+qM6MP5J5TaZiFc0laMY7+wvpumaHHOeBX5H1u1foZk/0GKzzTTL3NUhsAAAAASUVORK5CYII=)
                no-repeat;
            width: 21px;
            height: 18px;
            margin: 20px 10px 20px 0;
        }
        .user-name {
            float: left;
            font-size: 14px;
            color: #fdbb4d;
            margin-right: 35px;
            margin-top: 20px;
            line-height: 19px;
            text-decoration: none;
        }

        .logout {
            float: left;
            font-size: 14px;
            color: #d0d2d7;
            margin-right: 20px;
            margin-top: 20px;
            line-height: 19px;
            text-decoration: none;
        }
    }
}
</style>
<style lang="scss">
.admin-header .city-form-outter {
    margin-left: 40px;
    display: inline-block;
    .city-select {
        .el-form-item {
            margin-top: 10px;
            &__label {
                color: #fff;
                height: 35px;
                padding: 0 12px 8px 0;
            }
            &__content {
                height: 35px;
                .el-input__inner {
                    height: 35px !important;
                }
                .el-select {
                    font-size: 0;
                }
            }
        }
    }
}
</style>
