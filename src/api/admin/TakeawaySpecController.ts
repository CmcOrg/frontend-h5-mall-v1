import {SortOrder} from "antd/es/table/interface";
import MyOrderDTO from "@/model/dto/MyOrderDTO";
import $http from "@/util/HttpUtil";
import {AxiosRequestConfig} from "axios";

export interface NotEmptyIdSet {
    idSet: number[] // 主键 idSet
}

// 批量删除
export function TakeawaySpecDeleteByIdSet(form: NotEmptyIdSet, config?: AxiosRequestConfig) {
    return $http.myPost<string>('/takeaway/spec/deleteByIdSet', form, config)
}

export interface NotNullId {
    id: number // 主键id {"min":1}
}

export interface TakeawaySpecDO {
    typeName?: string // 规格类型名称，例如：颜色
    name?: string // 规格名称，例如：蓝色
    orderNo?: number // 排序号（值越大越前面，默认为 0）
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
export function TakeawaySpecInfoById(form: NotNullId, config?: AxiosRequestConfig) {
    return $http.myProPost<TakeawaySpecDO>('/takeaway/spec/infoById', form, config)
}

export interface TakeawaySpecInsertOrUpdateDTO {
    typeName: string // 规格类型名称，例如：颜色
    name: string // 规格名称，例如：蓝色
    orderNo?: number // 排序号（值越大越前面，默认为 0）
    enableFlag?: boolean // 是否启用
    remark?: string // 备注
    id?: number // 主键id {"min":1}
}

// 新增/修改
export function TakeawaySpecInsertOrUpdate(form: TakeawaySpecInsertOrUpdateDTO, config?: AxiosRequestConfig) {
    return $http.myPost<string>('/takeaway/spec/insertOrUpdate', form, config)
}

export interface TakeawaySpecPageDTO {
    typeName?: string // 规格类型名称，例如：颜色
    name?: string // 规格名称，例如：蓝色
    remark?: string // 备注
    enableFlag?: boolean // 是否启用
    current?: number // 第几页
    pageSize?: number // 每页显示条数
    order?: MyOrderDTO // 排序字段
    sort?: Record<string, SortOrder> // 排序字段（只在前端使用，实际传值：order）
}

// 分页排序查询
export function TakeawaySpecPage(form: TakeawaySpecPageDTO, config?: AxiosRequestConfig) {
    return $http.myProPagePost<TakeawaySpecDO>('/takeaway/spec/page', form, config)
}
