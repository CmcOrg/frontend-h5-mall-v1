import {SortOrder} from "antd/es/table/interface";
import MyOrderDTO from "@/model/dto/MyOrderDTO";
import $http from "@/util/HttpUtil";
import {AxiosRequestConfig} from "axios";

export interface NotEmptyIdSet {
    idSet: number[] // 主键 idSet
}

// 批量删除
export function TakeawaySkuDeleteByIdSet(form: NotEmptyIdSet, config?: AxiosRequestConfig) {
    return $http.myPost<string>('/takeaway/sku/deleteByIdSet', form, config)
}

export interface NotNullId {
    id: number // 主键id {"min":1}
}

export interface TakeawaySkuDO {
    spuId?: number // SPU 主键 id（外键）
    spuSpecJsonListStr?: string // 规格 json对象集合字符串，例如：[{}]
    price?: number // 价格
    minBuyNumber?: number // 最低购买数量
    maxBuyNumber?: number // 最高购买数量
    discountPrice?: number // 优惠价格
    discountNumber?: number // 优惠个数
    packagePrice?: number // 打包价格
    scene?: 1 | 2 // 场景：1 堂食 2 外卖
    prepareS?: number // 备货时长（秒）
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
export function TakeawaySkuInfoById(form: NotNullId, config?: AxiosRequestConfig) {
    return $http.myProPost<TakeawaySkuDO>('/takeaway/sku/infoById', form, config)
}

export interface TakeawaySkuInsertOrUpdateDTO {
    spuId?: number // SPU 主键 id（外键） {"min":1}
    spuSpecJsonListStr: string // 规格 json对象集合字符串，例如：[{}]
    price?: number // 价格
    minBuyNumber?: number // 最低购买数量
    maxBuyNumber?: number // 最高购买数量
    discountPrice?: number // 优惠价格
    discountNumber?: number // 优惠个数
    packagePrice?: number // 打包价格
    prepareS?: number // 备货时长（秒）
    enableFlag?: boolean // 是否启用
    remark?: string // 备注
    id?: number // 主键id {"min":1}
}

// 新增/修改
export function TakeawaySkuInsertOrUpdate(form: TakeawaySkuInsertOrUpdateDTO, config?: AxiosRequestConfig) {
    return $http.myPost<string>('/takeaway/sku/insertOrUpdate', form, config)
}

export interface TakeawaySkuPageDTO {
    spuId?: number // SPU 主键 id（外键）
    scene?: 1 | 2 // 场景：1 堂食 2 外卖
    enableFlag?: boolean // 是否启用
    remark?: string // 备注
    current?: number // 第几页
    pageSize?: number // 每页显示条数
    order?: MyOrderDTO // 排序字段
    sort?: Record<string, SortOrder> // 排序字段（只在前端使用，实际传值：order）
}

// 分页排序查询
export function TakeawaySkuPage(form: TakeawaySkuPageDTO, config?: AxiosRequestConfig) {
    return $http.myProPagePost<TakeawaySkuDO>('/takeaway/sku/page', form, config)
}
