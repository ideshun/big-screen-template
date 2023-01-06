/*
 * @Author: GXX
 * @Date: 2021-05-27 18:02:54
 * @LastEditors: ZY
 * @LastEditTime: 2021-12-31 09:31:41
 * @FilePath: /shared-operation-finance-big-screen/src/constant/unit.ts
 * @Description: 单位相关
 */

export enum UnitType {
  HundredMillion = 100000000, // 亿
  TentHousand = 10000, // 万
  Individual = 1, // 个
  Percentage = 0.01, // %
}

/**
 * @description:
 * @param {*}
 * @return {*}
 */
export const unitMapping = new Map([
  ['亿元', UnitType.HundredMillion.valueOf()],
  ['%', UnitType.Percentage.valueOf()],
  ['元/吨', UnitType.Individual.valueOf()],
  ['万吨', UnitType.TentHousand.valueOf()],
  ['美元/桶', UnitType.Individual.valueOf()],
  ['元/千方', UnitType.Individual.valueOf()],
  ['元', UnitType.Individual.valueOf()],
]);
