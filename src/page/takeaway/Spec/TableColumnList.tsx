import {YesNoDict} from "@/util/DictUtil";
import {ActionType, ProColumns} from "@ant-design/pro-components";
import {
    TakeawaySpecDeleteByIdSet,
    TakeawaySpecDO,
    TakeawaySpecInsertOrUpdateDTO
} from "@/api/admin/TakeawaySpecController";
import {ExecConfirm, ToastSuccess} from "@/util/ToastUtil";

const TableColumnList = (currentForm: React.MutableRefObject<TakeawaySpecInsertOrUpdateDTO | null>, setFormVisible: React.Dispatch<React.SetStateAction<boolean>>, actionRef: React.RefObject<ActionType>): ProColumns<TakeawaySpecDO>[] => [

    {
        title: '序号',
        dataIndex: 'index',
        valueType: 'index',
        width: 90,
    },

    {title: '类型名称', dataIndex: 'typeName', ellipsis: true,},

    {title: '规格名称', dataIndex: 'name', ellipsis: true,},

    {title: '排序号', dataIndex: 'orderNo', ellipsis: true, width: 90, hideInSearch: true,},

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
        valueEnum: YesNoDict
    },

    {title: '备注', dataIndex: 'remark', ellipsis: true, width: 90,},

    {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        render: (dom, entity) => [
            <a key="1" onClick={() => {
                currentForm.current = {id: entity.id} as TakeawaySpecInsertOrUpdateDTO
                setFormVisible(true)
            }}>编辑</a>,
            <a key="2" className={"red3"} onClick={() => {
                ExecConfirm(() => {
                    return TakeawaySpecDeleteByIdSet({idSet: [entity.id!]}).then(res => {
                        ToastSuccess(res.msg)
                        actionRef.current?.reload()
                    })
                }, undefined, `确定删除【${entity.name}】吗？`)
            }}>删除</a>,
        ],
    },
];

export default TableColumnList
