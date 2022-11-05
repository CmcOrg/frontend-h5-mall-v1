import {NumberStringMapToSelectList} from "@/util/DictUtil";

// 外卖场景
export const TakeawayCategorySceneTypeEnum = new Map<number, string>();
TakeawayCategorySceneTypeEnum.set(1, "堂食")
TakeawayCategorySceneTypeEnum.set(2, "外卖")

// 将 map转换为 下拉选 list
export const TakeawayCategorySceneTypeEnumSelectList = NumberStringMapToSelectList(TakeawayCategorySceneTypeEnum)
