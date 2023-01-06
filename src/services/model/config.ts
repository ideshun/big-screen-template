/*
 * @Author: ZY
 * @Date: 2021-05-26 09:27:25
 * @LastEditors: Deshun
 * @LastEditTime: 2023-01-05 10:11:49
 * @FilePath: \big-screen-template\src\services\model\config.ts
 * @Description: 全局配置model
 */

export interface RemoteConfigModel {
  dataLastMonth: string; // 默认日期
  dateFormatMonth: string; // 日期格式(月)
  dateFormatDay: string; // 日期格式(天)
  decimalPrecision: number; // 数值小数位
  percentPrecision: number; // 比率小数位
  defaultCompany: string; // 集团
  defaultCcy: string; // 金额单位
  defaultStockCompany: string; // 股份
  defaultNumberFormatter: string; // 默认数值格式
  defaultNumberHMDecimalFormatter: string; // 默认数值格式 带逗号
  defaultPercentFormatter: string; // 默认比率格式
}
