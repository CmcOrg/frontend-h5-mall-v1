import {YesNoDict} from "@/util/DictUtil";
import {ProFormColumnsType} from "@ant-design/pro-components";
import {TakeawayRiderInsertOrUpdateDTO} from "@/api/admin/TakeawayRiderController";

export const InitForm: TakeawayRiderInsertOrUpdateDTO = {} as TakeawayRiderInsertOrUpdateDTO

const SchemaFormColumnList = (): ProFormColumnsType<TakeawayRiderInsertOrUpdateDTO>[] => {
    return [

        {
            title: '用户主键 id',
            dataIndex: 'userId',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        min: 1,
                    },
                ],
            },
        },

        {
            title: '姓名',
            dataIndex: 'name',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        whitespace: true,
                        pattern: /^[\u4e00-\u9fa5]{0,}$/,
                    },
                ],
            },
        },

        {
            title: '身份证号',
            dataIndex: 'idNumber',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        whitespace: true,
                        pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                    },
                ],
            },
        },

        {
            title: '联系电话',
            dataIndex: 'phone',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        whitespace: true,
                        pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                    },
                ],
            },
        },

        {
            title: '是否开工',
            dataIndex: 'workFlag',
            valueEnum: YesNoDict,
            valueType: 'switch',
        },

        {
            title: '是否启用',
            dataIndex: 'enableFlag',
            valueEnum: YesNoDict,
            valueType: 'switch',
        },

        {
            title: '备注',
            dataIndex: 'remark',
            valueType: 'textarea',
            formItemProps: {
                rules: [
                    {
                        whitespace: true,
                        max: 300,
                    },
                ],
            },
            fieldProps: {
                showCount: true,
                maxLength: 300,
                allowClear: true,
            }
        },

    ]
}

export default SchemaFormColumnList
