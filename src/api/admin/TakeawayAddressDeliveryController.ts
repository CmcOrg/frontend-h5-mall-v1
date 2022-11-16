import {SortOrder} from "antd/es/table/interface";
import MyOrderDTO from "@/model/dto/MyOrderDTO";
import $http from "@/util/HttpUtil";
import {AxiosRequestConfig} from "axios";

export interface NotEmptyIdSet {
    idSet: number[] // 主键 idSet
}

// 批量删除
export function TakeawayAddressDeliveryDeleteByIdSet(form: NotEmptyIdSet, config?: AxiosRequestConfig) {
    return $http.myPost<string>('/takeaway/address/delivery/deleteByIdSet', form, config)
}

export interface NotNullId {
    id: number // 主键id {"min":1}
}

export interface TakeawayAddressDeliveryDO {
    userId?: number // 用户主键 id（外键）
    mapJson?: string // 地图取点（json）
    houseNumber?: string // 门牌号
    name?: string // 收货人名称
    phone?: string // 收货人联系电话
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
export function TakeawayAddressDeliveryInfoById(form: NotNullId, config?: AxiosRequestConfig) {
    return $http.myProPost<TakeawayAddressDeliveryDO>('/takeaway/address/delivery/infoById', form, config)
}

export interface TakeawayAddressDeliveryInsertOrUpdateDTO {
    mapJson: string // 地图取点（json）
    houseNumber: string // 门牌号
    name: string // 收货人名称
    phone: string // 收货人联系电话 {"regexp":"^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\\d{8}$"}
    id?: number // 主键id {"min":1}
}

// 新增/修改
export function TakeawayAddressDeliveryInsertOrUpdate(form: TakeawayAddressDeliveryInsertOrUpdateDTO, config?: AxiosRequestConfig) {
    return $http.myPost<string>('/takeaway/address/delivery/insertOrUpdate', form, config)
}

export interface TakeawayAddressDeliveryPageDTO {
    name?: string // 收货人名称
    phone?: string // 收货人联系电话
    current?: number // 第几页
    pageSize?: number // 每页显示条数
    order?: MyOrderDTO // 排序字段
    sort?: Record<string, SortOrder> // 排序字段（只在前端使用，实际传值：order）
}

// 分页排序查询
export function TakeawayAddressDeliveryPage(form: TakeawayAddressDeliveryPageDTO, config?: AxiosRequestConfig) {
    return $http.myProPagePost<TakeawayAddressDeliveryDO>('/takeaway/address/delivery/page', form, config)
}
