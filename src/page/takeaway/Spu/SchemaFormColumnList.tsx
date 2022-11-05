import {YesNoDict} from "@/util/DictUtil";
import {ProFormColumnsType} from "@ant-design/pro-components";
import {TakeawaySpuInsertOrUpdateDTO} from "@/api/admin/TakeawaySpuController";

export const InitForm: TakeawaySpuInsertOrUpdateDTO = {} as TakeawaySpuInsertOrUpdateDTO

const SchemaFormColumnList = (): ProFormColumnsType<TakeawaySpuInsertOrUpdateDTO>[] => {
    return [

        {
            title: '名称',
            dataIndex: 'name',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        whitespace: true,
                    },
                ],
            },
            tooltip: '例如：招牌芋圆奶茶',
        },

        {
            title: '场景',
            dataIndex: 'scene',
            formItemProps: {
                rules: [
                    {
                        required: true,
                    },
                ],
            },
        },

        {
            title: '是否必选',
            dataIndex: 'mustFlag',
            valueEnum: YesNoDict,
            valueType: 'switch',
            tooltip: '是否：不选无法下单',
        },

        {
            title: '排序号',
            dataIndex: 'orderNo',
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
