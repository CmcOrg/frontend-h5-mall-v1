import {YesNoDict} from "@/util/DictUtil";
import {ActionType, ProColumns} from "@ant-design/pro-components";
import {SysParamDeleteByIdSet, SysParamDO, SysParamInsertOrUpdateDTO} from "@/api/admin/SysParamController";
import {ExecConfirm, ToastSuccess} from "@/util/ToastUtil";
import {Typography} from "antd";

const TableColumnList = (currentForm: React.MutableRefObject<SysParamInsertOrUpdateDTO | null>, setFormVisible: React.Dispatch<React.SetStateAction<boolean>>, actionRef: React.RefObject<ActionType>): ProColumns<SysParamDO>[] => [

    {
        title: '序号',
        dataIndex: 'index',
        valueType: 'index',
        width: 90,
    },

    {title: '配置名', dataIndex: 'name', ellipsis: true, width: 90,},

    {
        title: '值', dataIndex: 'value', hideInSearch: true, width: 300, render: (text) => {
            return <Typography.Text ellipsis={{tooltip: true}} style={{width: 300}}>{text}</Typography.Text>
        }
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
        valueEnum: YesNoDict,
        width: 90
    },

    {
        title: '备注', dataIndex: 'remark', width: 300, render: (text) => {
            return <Typography.Text ellipsis={{tooltip: true}} style={{width: 300}}>{text}</Typography.Text>
        }
    },

    {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        render: (dom, entity) => [
            <a key="1" onClick={() => {
                currentForm.current = {id: entity.id} as SysParamInsertOrUpdateDTO
                setFormVisible(true)
            }}>编辑</a>,
            <a key="2" className={"red3"} onClick={() => {
                ExecConfirm(() => {
                    return SysParamDeleteByIdSet({idSet: [entity.id!]}).then(res => {
                        ToastSuccess(res.msg)
                        actionRef.current?.reload()
                    })
                }, undefined, `确定删除【${entity.name}】吗？`)
            }}>删除</a>,
        ],
    },
];

export default TableColumnList
