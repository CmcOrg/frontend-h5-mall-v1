import {YesNoDict} from "@/util/DictUtil";
import {ProFormColumnsType} from "@ant-design/pro-components";
import {TakeawayCategoryInsertOrUpdateDTO} from "@/api/admin/TakeawayCategoryController";

export const InitForm: TakeawayCategoryInsertOrUpdateDTO = {} as TakeawayCategoryInsertOrUpdateDTO

const SchemaFormColumnList = (): ProFormColumnsType<TakeawayCategoryInsertOrUpdateDTO>[] => {
    return [

        {
            title: '分类名称',
            dataIndex: 'name',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        whitespace: true,
                    },
                ],
            },
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
            title: '是否启用',
            dataIndex: 'enableFlag',
            valueEnum: YesNoDict,
            valueType: 'switch',
        },

    ]
}

export default SchemaFormColumnList
