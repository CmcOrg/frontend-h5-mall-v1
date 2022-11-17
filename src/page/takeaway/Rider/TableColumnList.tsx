import {GetDictList, YesNoDict} from "@/util/DictUtil";
import {ActionType, ProColumns} from "@ant-design/pro-components";
import {
    TakeawayRiderDeleteByIdSet,
    TakeawayRiderDO,
    TakeawayRiderInsertOrUpdateDTO
} from "@/api/admin/TakeawayRiderController";
import {ExecConfirm, ToastSuccess} from "@/util/ToastUtil";
import {SysUserDictList} from "@/api/admin/SysUserController";

const TableColumnList = (currentForm: React.MutableRefObject<TakeawayRiderInsertOrUpdateDTO | null>, setFormVisible: React.Dispatch<React.SetStateAction<boolean>>, actionRef: React.RefObject<ActionType>): ProColumns<TakeawayRiderDO>[] => [
    {
        title: '序号',
        dataIndex: 'index',
        valueType: 'index',
        width: 90,
    },

    {
        title: '关联用户', dataIndex: 'userId', ellipsis: true, width: 90, valueType: 'select',
        fieldProps: {
            showSearch: true,
        },
        request: () => {
            return GetDictList(SysUserDictList)
        }
    },

    {title: '姓名', dataIndex: 'name', ellipsis: true, width: 90,},

    {title: '身份证号', dataIndex: 'idNumber', ellipsis: true, width: 90,},

    {title: '联系电话', dataIndex: 'phone', ellipsis: true, width: 90,},

    {
        title: '是否开工',
        dataIndex: 'workFlag',
        valueEnum: YesNoDict
    },

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
                currentForm.current = {id: entity.id} as TakeawayRiderInsertOrUpdateDTO
                setFormVisible(true)
            }}>编辑</a>,
            <a key="2" className={"red3"} onClick={() => {
                ExecConfirm(() => {
                    return TakeawayRiderDeleteByIdSet({idSet: [entity.id!]}).then(res => {
                        ToastSuccess(res.msg)
                        actionRef.current?.reload()
                    })
                }, undefined, `确定删除【${entity.name}】吗？`)
            }}>删除</a>,
        ],
    },
];

export default TableColumnList
