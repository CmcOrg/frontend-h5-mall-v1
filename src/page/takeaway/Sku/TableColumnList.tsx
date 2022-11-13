import {YesNoDict} from "@/util/DictUtil";
import {ActionType, ProColumns} from "@ant-design/pro-components";
import {TakeawaySkuDeleteByIdSet, TakeawaySkuDO, TakeawaySkuInsertOrUpdateDTO} from "@/api/admin/TakeawaySkuController";
import {ExecConfirm, ToastSuccess} from "@/util/ToastUtil";
import {TakeawayCategorySceneTypeEnumSelectList} from "@/page/takeaway/Category/Enums";
import {TakeawaySpecDO} from "@/api/admin/TakeawaySpecController";

const TableColumnList = (currentForm: React.MutableRefObject<TakeawaySkuInsertOrUpdateDTO | null>, setFormVisible: React.Dispatch<React.SetStateAction<boolean>>, actionRef: React.RefObject<ActionType>): ProColumns<TakeawaySkuDO>[] => [
    {
        title: '序号',
        dataIndex: 'index',
        valueType: 'index',
        width: 90,
    },

    {title: '关联SPU', dataIndex: 'spuId', ellipsis: true, width: 90,},

    {
        title: '规格参数',
        dataIndex: 'spuSpecJsonListStr',
        ellipsis: true,
        width: 90,
        hideInSearch: true,
        renderText: (text) => {
            const specList = JSON.parse(text) as TakeawaySpecDO[];
            return specList.map(item => item.typeName + ':' + item.name).join(';')
        }
    },

    {title: '价格', dataIndex: 'price', ellipsis: true, width: 90, hideInSearch: true,},

    {title: '最低购买', dataIndex: 'minBuyNumber', ellipsis: true, width: 90, hideInSearch: true,},

    {title: '最高购买', dataIndex: 'maxBuyNumber', ellipsis: true, width: 90, hideInSearch: true,},

    {title: '优惠价格', dataIndex: 'discountPrice', ellipsis: true, width: 90, hideInSearch: true,},

    {title: '优惠个数', dataIndex: 'discountNumber', ellipsis: true, width: 90, hideInSearch: true,},

    {title: '打包价格', dataIndex: 'packagePrice', ellipsis: true, width: 90, hideInSearch: true,},

    {
        title: '场景', dataIndex: 'scene', valueType: 'select',
        fieldProps: {
            showSearch: true,
            options: TakeawayCategorySceneTypeEnumSelectList,
        },
    },

    {title: '备货时长', dataIndex: 'prepareS', ellipsis: true, width: 90, hideInSearch: true,},

    {
        title: '创建时间',
        dataIndex: 'createTime',
        hideInSearch: true,
        valueType: 'fromNow',
    },

    {
        title: '修改时间',
        dataIndex: 'updateTime',
        hideInSearch: true,
        valueType: 'fromNow',
    },

    {
        title: '是否启用',
        dataIndex: 'enableFlag',
        valueEnum: YesNoDict,
        width: 90,
    },

    {title: '备注', dataIndex: 'remark', ellipsis: true, width: 90,},

    {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        render: (dom, entity) => [
            <a key="1" onClick={() => {
                currentForm.current = {id: entity.id} as TakeawaySkuInsertOrUpdateDTO
                setFormVisible(true)
            }}>编辑</a>,
            <a key="2" className={"red3"} onClick={() => {
                ExecConfirm(() => {
                    return TakeawaySkuDeleteByIdSet({idSet: [entity.id!]}).then(res => {
                        ToastSuccess(res.msg)
                        actionRef.current?.reload()
                    })
                }, undefined, `确定删除【${entity.id}】吗？`)
            }}>删除</a>,
        ],
    },
];

export default TableColumnList
