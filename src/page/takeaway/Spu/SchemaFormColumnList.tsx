import {getByValueFromDictList, GetDictList, YesNoDict} from "@/util/DictUtil";
import {ProFormColumnsType} from "@ant-design/pro-components";
import {TakeawaySpuInsertOrUpdateDTO} from "@/api/admin/TakeawaySpuController";
import {TakeawayCategorySceneTypeEnumSelectList} from "@/page/takeaway/Category/Enums";
import {TakeawayCategoryPage} from "@/api/admin/TakeawayCategoryController";
import {OptionProps} from "antd/es/select";
import {TakeawaySpecDO, TakeawaySpecPage} from "@/api/admin/TakeawaySpecController";
import {FormInstance} from "antd/es";
import {useRef} from "react";
import CollUtil from "@/util/CollUtil";

export const InitForm: TakeawaySpuInsertOrUpdateDTO = {} as TakeawaySpuInsertOrUpdateDTO

const SchemaFormColumnList = (useForm: FormInstance<TakeawaySpuInsertOrUpdateDTO>): ProFormColumnsType<TakeawaySpuInsertOrUpdateDTO>[] => {

    const takeawaySpecSelectListRef = useRef<TakeawaySpecDO[]>([])
    // const [specCheckboxList, setSpecCheckboxList] = useState<DictStringListVO[]>([] as DictStringListVO[]);

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
            request: () => {
                return GetDictList(TakeawayCategoryPage)
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
            request: async () => {
                await GetDictList(TakeawaySpecPage, true).then(res => {
                    takeawaySpecSelectListRef.current = res as TakeawaySpecDO[]
                })
                return takeawaySpecSelectListRef.current
            }
        },

        {
            valueType: 'dependency',
            fieldProps: {
                name: ['specIdSet'],
            },
            columns: ({specIdSet}: ({ specIdSet: number[] })): ProFormColumnsType<TakeawaySpuInsertOrUpdateDTO>[] => {

                useForm.setFieldValue('specJsonListStrSet', '')
                // setSpecCheckboxList([] as DictStringListVO[])

                if (CollUtil.isNotEmpty(specIdSet)) {
                    const specMap = new Map<string, TakeawaySpecDO[]>();
                    takeawaySpecSelectListRef.current.forEach(item => {
                        if (!specIdSet.includes(item.id!)) {
                            return
                        }
                        const specList = specMap.get(item.typeName!);
                        const tempItem = {typeName: item.typeName, name: item.name, orderNo: item.orderNo}
                        if (CollUtil.isEmpty(specList)) {
                            specMap.set(item.typeName!, [tempItem]);
                        } else {
                            specList!.push(tempItem)
                        }
                    })
                    const specList: TakeawaySpecDO[][] = []
                    specMap.forEach((value) => {
                        specList.push(value)
                    })

                    const descartesSpecList = CollUtil.descartes(specList);

                    // const tempSpecCheckboxList: DictStringListVO[] = [] as DictStringListVO[]

                    // descartesSpecList.forEach((item, index) => {
                    //     if (item instanceof Array) {
                    //         const specList = item as TakeawaySpecDO[];
                    //         const specStr = specList.sort((a, b) => a.orderNo! - b.orderNo!).map((subItem) => {
                    //             return subItem.typeName + ":" + subItem.name
                    //         }).join(";")
                    //         tempSpecCheckboxList.push({label: specStr, value: specStr})
                    //     } else {
                    //         const specStr = item.typeName + ":" + item.name;
                    //         tempSpecCheckboxList.push({label: specStr, value: specStr})
                    //     }
                    // })

                    // setSpecCheckboxList(tempSpecCheckboxList)

                    setTimeout(() => {
                        useForm.setFieldValue('specJsonListStrSet', JSON.stringify(descartesSpecList))
                    }, 20)
                }

                return [
                    {
                        title: '规格',
                        dataIndex: 'specJsonListStrSet',
                        valueType: 'textarea',
                        fieldProps: {
                            allowClear: true,
                        },
                        formItemProps: {
                            rules: [
                                {
                                    required: true,
                                },
                            ],
                        },
                    },

                    // {
                    //     title: '规格列表',
                    //     dataIndex: 'specCheckboxList',
                    //     valueType: 'checkbox',
                    //     fieldProps: {
                    //         options: specCheckboxList,
                    //     },
                    // },

                ]
            }

        }

    ]
}

export default SchemaFormColumnList
