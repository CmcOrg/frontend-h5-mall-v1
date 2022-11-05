import {useRef, useState} from "react";
import {ActionType, BetaSchemaForm, ColumnsState, ProTable} from "@ant-design/pro-components";
import {Button, Form, Space} from "antd";
import {PlusOutlined} from "@ant-design/icons/lib";
import {
    TakeawayCategoryDeleteByIdSet,
    TakeawayCategoryDO,
    TakeawayCategoryInfoById,
    TakeawayCategoryInsertOrUpdate,
    TakeawayCategoryInsertOrUpdateDTO,
    TakeawayCategoryPage,
    TakeawayCategoryPageDTO
} from "@/api/admin/TakeawayCategoryController";
import TableColumnList from "./TableColumnList";
import {ExecConfirm, ToastSuccess} from "@/util/ToastUtil";
import SchemaFormColumnList, {InitForm} from "./SchemaFormColumnList";
import CommonConstant from "@/model/constant/CommonConstant";

// 商品分类
export default function () {

    const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>();

    const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);

    const actionRef = useRef<ActionType>(null)

    const [useForm] = Form.useForm<TakeawayCategoryInsertOrUpdateDTO>();

    const [formVisible, setFormVisible] = useState<boolean>(false);

    const currentForm = useRef<TakeawayCategoryInsertOrUpdateDTO>({} as TakeawayCategoryInsertOrUpdateDTO)

    return (
        <>
            <ProTable<TakeawayCategoryDO, TakeawayCategoryPageDTO>
                scroll={{x: 'max-content'}}
                sticky={{offsetHeader: CommonConstant.NAV_TOP_HEIGHT}}
                actionRef={actionRef}
                rowKey={"id"}
                pagination={{
                    showQuickJumper: true,
                    showSizeChanger: true,
                }}
                columnEmptyText={false}
                columnsState={{
                    value: columnsStateMap,
                    onChange: setColumnsStateMap,
                }}
                rowSelection={{}}
                expandable={{
                    expandedRowKeys,
                    onExpandedRowsChange: (expandedRows) => {
                        setExpandedRowKeys(expandedRows as number[])
                    },
                }}
                revalidateOnFocus={false}
                columns={TableColumnList(currentForm, setFormVisible, actionRef)}
                options={{
                    fullScreen: true,
                }}
                request={(params, sort, filter) => {
                    return TakeawayCategoryPage({...params, sort})
                }}
                toolbar={{
                    actions: [
                        <Button key={"1"} icon={<PlusOutlined/>} type="primary" onClick={() => {
                            currentForm.current = {} as TakeawayCategoryInsertOrUpdateDTO
                            setFormVisible(true)
                        }}>新建</Button>
                    ],
                }}
                tableAlertOptionRender={({selectedRowKeys, selectedRows, onCleanSelected}) => (
                    <Space size={16}>
                        <a className={"red3"} onClick={() => {
                            ExecConfirm(() => {
                                return TakeawayCategoryDeleteByIdSet({idSet: selectedRowKeys as number[]}).then(res => {
                                    ToastSuccess(res.msg)
                                    actionRef.current?.reload()
                                    onCleanSelected()
                                })
                            }, undefined, `确定删除选中的【${selectedRowKeys.length}】项吗？`)
                        }}>批量删除</a>
                        <a onClick={onCleanSelected}>取消选择</a>
                    </Space>
                )}
            >
            </ProTable>

            <BetaSchemaForm<TakeawayCategoryInsertOrUpdateDTO>
                title={currentForm.current.id ? "编辑商品分类" : "新建商品分类"}
                layoutType={"ModalForm"}
                grid
                rowProps={{
                    gutter: 16
                }}
                colProps={{
                    span: 12
                }}
                modalProps={{
                    maskClosable: false,
                }}
                form={useForm}
                isKeyPressSubmit
                submitter={{
                    render: (props, dom) => {
                        return [
                            ...dom,
                            <Button
                                key="1"
                                onClick={() => {
                                    ExecConfirm(async () => {
                                        props.reset();
                                    }, undefined, "确定重置表单吗？")
                                }}
                            >
                                重置
                            </Button>,
                            currentForm.current.id ? <Button
                                key="2"
                                type="primary"
                                danger
                                onClick={() => {
                                    ExecConfirm(async () => {
                                        return TakeawayCategoryDeleteByIdSet({idSet: [currentForm.current.id!]}).then(res => {
                                            setFormVisible(false)
                                            ToastSuccess(res.msg)
                                            actionRef.current?.reload()
                                        })
                                    }, undefined, `确定删除【${currentForm.current.name}】吗？`)
                                }}>
                                删除
                            </Button> : null
                        ]
                    },
                }}
                params={new Date()} // 目的：为了打开页面时，执行 request方法
                request={async () => {

                    useForm.resetFields()

                    if (currentForm.current.id) {
                        await TakeawayCategoryInfoById({id: currentForm.current.id}).then(res => {
                            currentForm.current = res as TakeawayCategoryInsertOrUpdateDTO
                        })
                    }
                    useForm.setFieldsValue(currentForm.current) // 组件会深度克隆 currentForm.current

                    return InitForm
                }}
                visible={formVisible}
                onVisibleChange={setFormVisible}
                columns={SchemaFormColumnList()}
                onFinish={async (form) => {
                    await TakeawayCategoryInsertOrUpdate({...currentForm.current, ...form}).then(res => {
                        ToastSuccess(res.msg)
                        actionRef.current?.reload()
                    })
                    return true
                }}
            />
        </>
    )
}
