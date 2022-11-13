import {SortOrder} from "antd/es/table/interface";
import MyOrderDTO from "@/model/dto/MyOrderDTO";
import $http from "@/util/HttpUtil";
import {AxiosRequestConfig} from "axios";

export interface NotEmptyIdSet {
    idSet: number[] // 主键 idSet
}

// 批量删除
export function TakeawaySpuDeleteByIdSet(form: NotEmptyIdSet, config?: AxiosRequestConfig) {
    return $http.myPost<string>('/takeaway/spu/deleteByIdSet', form, config)
}

export interface NotNullId {
    id: number // 主键id {"min":1}
}

export interface TakeawaySpuInfoByIdVO {
    categoryIdSet?: number[] // 商品分类主键 idSet
    specJsonListStr?: string // 规格 json对象集合字符串
    name?: string // SPU名称
    scene?: 1 | 2 // 场景：1 堂食 2 外卖
    mustFlag?: boolean // 是否必选，即：不选无法下单
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
export function TakeawaySpuInfoById(form: NotNullId, config?: AxiosRequestConfig) {
    return $http.myProPost<TakeawaySpuInfoByIdVO>('/takeaway/spu/infoById', form, config)
}

export interface TakeawaySpuInsertOrUpdateDTO {
    name: string // SPU名称
    scene: 1 | 2 // 场景：1 堂食 2 外卖
    mustFlag?: boolean // 是否必选，即：不选无法下单
    orderNo?: number // 排序号（值越大越前面，默认为 0）
    enableFlag?: boolean // 是否启用
    remark?: string // 备注
    categoryIdSet?: number[] // 商品分类主键 idSet
    specJsonListStr: string // 规格 json对象集合字符串
    id?: number // 主键id {"min":1}
}

// 新增/修改
export function TakeawaySpuInsertOrUpdate(form: TakeawaySpuInsertOrUpdateDTO, config?: AxiosRequestConfig) {
    return $http.myPost<string>('/takeaway/spu/insertOrUpdate', form, config)
}

export interface TakeawaySpuPageDTO {
    id?: number // 主键id
    name?: string // SPU名称
    scene?: 1 | 2 // 场景：1 堂食 2 外卖
    mustFlag?: boolean // 是否必选，即：不选无法下单
    orderNo?: number // 排序号（值越大越前面，默认为 0）
    enableFlag?: boolean // 是否启用
    remark?: string // 备注
    current?: number // 第几页
    pageSize?: number // 每页显示条数
    order?: MyOrderDTO // 排序字段
    sort?: Record<string, SortOrder> // 排序字段（只在前端使用，实际传值：order）
}

export interface TakeawaySpuDO {
    name?: string // SPU名称
    scene?: 1 | 2 // 场景：1 堂食 2 外卖
    mustFlag?: boolean // 是否必选，即：不选无法下单
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

// 分页排序查询
export function TakeawaySpuPage(form: TakeawaySpuPageDTO, config?: AxiosRequestConfig) {
    return $http.myProPagePost<TakeawaySpuDO>('/takeaway/spu/page', form, config)
}
