import {getByValueFromDictList, GetDictList, YesNoDict} from "@/util/DictUtil";
import {ProFormColumnsType} from "@ant-design/pro-components";
import {TakeawaySpuInsertOrUpdateDTO} from "@/api/admin/TakeawaySpuController";
import {TakeawayCategorySceneTypeEnumSelectList} from "@/page/takeaway/Category/Enums";
import {TakeawayCategoryDO, TakeawayCategoryPage} from "@/api/admin/TakeawayCategoryController";
import {OptionProps} from "antd/es/select";
import {TakeawaySpecPage} from "@/api/admin/TakeawaySpecController";
import {FormInstance} from "antd/es";
import {useRef} from "react";

export const InitForm: TakeawaySpuInsertOrUpdateDTO = {} as TakeawaySpuInsertOrUpdateDTO

const SchemaFormColumnList = (useForm: FormInstance<TakeawaySpuInsertOrUpdateDTO>): ProFormColumnsType<TakeawaySpuInsertOrUpdateDTO>[] => {

    const takeawayCategorySelectListRef = useRef<TakeawayCategoryDO[]>([])

    return [

        {
            title: 'SPU名称',
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
            valueType: 'select',
            fieldProps: {
                showSearch: true,
                options: TakeawayCategorySceneTypeEnumSelectList,
            },
            formItemProps: {
                rules: [
                    {
                        required: true,
                    },
                ],
            },
        },

        {
            title: '关联分类',
            dataIndex: 'categoryIdSet',
            valueType: 'select',
            fieldProps: {
                showSearch: true,
                mode: 'multiple',
                maxTagCount: 'responsive',
                optionLabelProp: 'children',
                // @ts-ignore
                optionItemRender: (item: OptionProps) => {
                    return <div>
                        {getByValueFromDictList(TakeawayCategorySceneTypeEnumSelectList, item.scene)}-{item.label}
                    </div>
                },
            },
            request: async () => {
                await GetDictList(TakeawayCategoryPage, true).then(res => {
                    takeawayCategorySelectListRef.current = res as TakeawayCategoryDO[]
                })
                return takeawayCategorySelectListRef.current
            }
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

        {
            title: '关联规格',
            dataIndex: 'specIdSet',
            valueType: 'select',
            fieldProps: {
                showSearch: true,
                mode: 'multiple',
                maxTagCount: 'responsive',
                optionLabelProp: 'children',
                // @ts-ignore
                optionItemRender: (item: OptionProps) => {
                    return <div>
                        {item.typeName}-{item.label}
                    </div>
                },
            },
            request: () => {
                return GetDictList(TakeawaySpecPage, true)
            }
        },

        {
            valueType: 'dependency',
            fieldProps: {
                name: ['specIdSet'],
            },
            columns: ({specIdSet}: ({ specIdSet: number[] })): ProFormColumnsType<TakeawaySpuInsertOrUpdateDTO>[] => {

                // takeawayCategorySelectListRef.current
                // useForm.setFieldValue('', '')

                return [
                    {
                        title: '规格列表',
                        dataIndex: 'specJsonListStrSet',
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

        }

    ]
}

export default SchemaFormColumnList
