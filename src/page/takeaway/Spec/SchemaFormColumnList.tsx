import {YesNoDict} from "@/util/DictUtil";
import {ProFormColumnsType} from "@ant-design/pro-components";
import {TakeawaySpecInsertOrUpdateDTO} from "@/api/admin/TakeawaySpecController";

export const InitForm: TakeawaySpecInsertOrUpdateDTO = {} as TakeawaySpecInsertOrUpdateDTO

const SchemaFormColumnList = (): ProFormColumnsType<TakeawaySpecInsertOrUpdateDTO>[] => {
    return [

        {
            title: '类型名称',
            dataIndex: 'typeName',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        whitespace: true,
                    },
                ],
            },
            tooltip: '例如：颜色',
        },

        {
            title: '规格名称',
            dataIndex: 'name',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        whitespace: true,
                    },
                ],
            },
            tooltip: '例如：蓝色',
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
