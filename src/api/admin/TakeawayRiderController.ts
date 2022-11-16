import {SortOrder} from "antd/es/table/interface";
import MyOrderDTO from "@/model/dto/MyOrderDTO";
import $http from "@/util/HttpUtil";
import {AxiosRequestConfig} from "axios";

export interface NotEmptyIdSet {
    idSet: number[] // 主键 idSet
}

// 批量删除
export function TakeawayRiderDeleteByIdSet(form: NotEmptyIdSet, config?: AxiosRequestConfig) {
    return $http.myPost<string>('/takeaway/rider/deleteByIdSet', form, config)
}

export interface NotNullId {
    id: number // 主键id {"min":1}
}

export interface TakeawayRiderDO {
    userId?: number // 用户主键 id（外键）
    name?: string // 骑手姓名
    idNumber?: string // 骑手身份证号码
    phone?: string // 骑手联系电话
    workFlag?: boolean // 是否开工
    id?: number // 主键id
    createId?: number // 创建人id
    createTime?: string // 创建时间
    updateId?: number // 修改人id
    updateTime?: string // 修改时间
    version?: number // 乐观锁
    enableFlag?: boolean // 是否启用
    delFlag?: boolean // 是否逻辑删除
    remark?: string // 备注
}

// 通过主键id，查看详情
export function TakeawayRiderInfoById(form: NotNullId, config?: AxiosRequestConfig) {
    return $http.myProPost<TakeawayRiderDO>('/takeaway/rider/infoById', form, config)
}

export interface TakeawayRiderInsertOrUpdateDTO {
    userId: number // 用户主键 id（外键） {"min":1}
    name: string // 骑手姓名 {"regexp":"^[\\u4e00-\\u9fa5]{0,}$"}
    idNumber: string // 骑手身份证号码 {"regexp":"(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)"}
    phone: string // 骑手联系电话 {"regexp":"^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\\d{8}$"}
    workFlag?: boolean // 是否开工
    enableFlag?: boolean // 是否启用
    remark?: string // 备注
    id?: number // 主键id {"min":1}
}

// 新增/修改
export function TakeawayRiderInsertOrUpdate(form: TakeawayRiderInsertOrUpdateDTO, config?: AxiosRequestConfig) {
    return $http.myPost<string>('/takeaway/rider/insertOrUpdate', form, config)
}

export interface TakeawayRiderPageDTO {
    userId?: number // 用户主键 id（外键）
    name?: string // 骑手姓名
    idNumber?: string // 骑手身份证号码
    phone?: string // 骑手联系电话
    workFlag?: boolean // 是否开工
    enableFlag?: boolean // 是否启用
    remark?: string // 备注
    current?: number // 第几页
    pageSize?: number // 每页显示条数
    order?: MyOrderDTO // 排序字段
    sort?: Record<string, SortOrder> // 排序字段（只在前端使用，实际传值：order）
}

// 分页排序查询
export function TakeawayRiderPage(form: TakeawayRiderPageDTO, config?: AxiosRequestConfig) {
    return $http.myProPagePost<TakeawayRiderDO>('/takeaway/rider/page', form, config)
}
