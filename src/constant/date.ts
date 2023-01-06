/*
 * @Author: ZY
 * @Date: 2021-05-30 17:05:13
 * @LastEditors: Deshun
 * @LastEditTime: 2023-01-05 10:22:04
 * @FilePath: \big-screen-template\src\constant\date.ts
 * @Description: 日期相关
 */

/**
 * @description: 期间值数据类型--标识
 * BY:本年
 * BM：本月
 * BD：本天
 * BQ: 本季
 * BW: 本周
 * BHY: 本半年
 */
export enum DPeriodsDateType {
  BY = '0000100001',
  BM = '0000100007',
  BD = '0000100013',
  BQ = '0000100019',
  BW = '0000100031',
  BHY = '0000100047',
}

export enum CustomDateFormat {
  'YYYY=>YYYY' = 'YYYY年-YYYY年',
  'YYYY-MM=>MM' = 'YYYY年MM-MM月',
  'YYYY-MM-DD=>DD' = 'YYYY年MM月DD-DD日',
  'YYYY-Q' = 'YYYY年第Q季',
  'YYYY-M=>M' = 'YYYY年M-M月',
}
