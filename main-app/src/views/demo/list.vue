<script>
import { route } from 'lib/tool';
import formConfig from './form';
export default {
    data() {
        return {
            // 筛选项配置
            searchConfig: {
                data: [
                    {
                        type: 'input',
                        title: '名称',
                        model: 'name',
                        placeholder: '全部'
                    },
                    {
                        type: 'select',
                        selectType: 'keyValue',
                        title: '状态',
                        model: 'status',
                        modelValue: 1,
                        placeholder: '选择状态',
                        list: { 1: '正常', 2: '其他' }
                    }
                ]
            },
            // 表格配置
            tableConfig: [
                {
                    label: '名称',
                    prop: 'name',
                    minWidth: 120
                },
                {
                    label: '状态',
                    prop: 'status',
                    format: v => v + '...',
                    width: 200
                },
                {
                    label: '自定义',
                    render: (h, scope) => <div>自定义</div>
                },
                {
                    label: '操作',
                    action: ['update']
                }
            ],
            // 编辑表格配置
            formConfig
        };
    },
    mounted() {
        console.log(this.$serv.getAdminInfo);
    },
    methods: {
        toDetail() {
            route('/app1');
        },
        toDetail2() {
            route('/app2');
        }
    }
};
</script>
<template lang="pug">
div
    table-search(
        ref="table"
        :searchConfig="searchConfig"
        :tableConfig="tableConfig"
        :formConfig="formConfig"
        :getDataAPI="$serv.demoList"
        :updateDataAPI="$serv.demoUpdate"
    )
        template(slot="operate" slot-scope="scope")
            el-button(
                type="primary" @click="toDetail") 跳转
            el-button.f-right(
                type="primary"
                @click="toDetail2") 跳转2
</template>
