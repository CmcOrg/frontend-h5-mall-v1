import {YesNoDict} from "@/util/DictUtil";
import {ActionType, ProColumns} from "@ant-design/pro-components";
import {
    TakeawayCategoryDeleteByIdSet,
    TakeawayCategoryDO,
    TakeawayCategoryInsertOrUpdateDTO
} from "@/api/admin/TakeawayCategoryController";
import {ExecConfirm, ToastSuccess} from "@/util/ToastUtil";

const TableColumnList = (currentForm: React.MutableRefObject<TakeawayCategoryInsertOrUpdateDTO | null>, setFormVisible: React.Dispatch<React.SetStateAction<boolean>>, actionRef: React.RefObject<ActionType>): ProColumns<TakeawayCategoryDO>[] => [
    {
        title: '序号',
        dataIndex: 'index',
        valueType: 'index',
    },

    {title: '分类名称', dataIndex: 'name', ellipsis: true,},

    {title: '场景', dataIndex: 'scene', ellipsis: true,},

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

    {title: '备注', dataIndex: 'remark', ellipsis: true, width: 50,},

    {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        render: (dom, entity) => [
            <a key="1" onClick={() => {
                currentForm.current = {id: entity.id} as TakeawayCategoryInsertOrUpdateDTO
                setFormVisible(true)
            }}>编辑</a>,
            <a key="2" className={"red3"} onClick={() => {
                ExecConfirm(() => {
                    return TakeawayCategoryDeleteByIdSet({idSet: [entity.id!]}).then(res => {
                        ToastSuccess(res.msg)
                        actionRef.current?.reload()
                    })
                }, undefined, `确定删除【${entity.name}】吗？`)
            }}>删除</a>,
        ],
    },
];

export default TableColumnList
