/*
 * @Author: yar
 * @Date: 2021-12-31 17:12:37
 * @LastEditTime: 2023-01-05 10:14:32
 * @LastEditors: Deshun
 * @FilePath: \big-screen-template\src\utils\number.ts
 * @Description: 数值格式化
 */

import { numberFreeFormat, numberPercent } from '@/utils/viewFormat';
import RemoteConfig from '@/settings/remoteConfig';
import { UnitType } from '@/constant/unit';
/**
 * @description:  计算百分数  = (current - last)/last
 * @param {number} current 当前数值
 * @param {number} last 过去数值
 * @param {boolean} isFormat 是否格式化
 * @param {boolean} isShowSign 是否显示正负号
 * @param {string} isShowSign 格式
 * @return 小数/百分数
 */
export function calcPercent({
  current,
  last,
  isFormat,
  isShowSign,
  customPercentFormatter = RemoteConfig.getConfig.defaultPercentFormatter,
}: {
  current: number | string;
  last: number | string;
  isFormat: boolean;
  isShowSign: boolean;
  customPercentFormatter?: string;
}) {
  let percent = '-';
  if (Number(last) !== 0) {
    percent = ((Number(current) - Number(last)) / Math.abs(Number(last))).toString();
    if (isFormat) {
      if (isShowSign) {
        if (Number(percent) > 0) {
          return `+${numberPercent(percent, customPercentFormatter)}`;
        } else {
          return numberPercent(percent, customPercentFormatter);
        }
      }
      return numberPercent(percent, customPercentFormatter);
    } else {
      return percent;
    }
  } else {
    return percent;
  }
}

/**
 * @description:  计算差额  = (current - last)
 * @param {number} current 当前数值
 * @param {number} last 过去数值
 * @param {boolean} isFormatter 是否格式化
 * @param {boolean} isShowSign 是否显示正负号
 * @param {string} isShowSign 格式
 * @return
 */
export function calcDiffVal({
  current,
  last,
  isFormatter,
  isShowSign,
  unitType = UnitType.Individual,
  customNumberFormatter = RemoteConfig.getConfig.defaultNumberFormatter,
}: {
  current: number | string;
  last: number | string;
  isFormatter: boolean;
  isShowSign: boolean;
  unitType: UnitType;
  customNumberFormatter?: string;
}) {
  let diffVal = '-';
  if (Number(last) !== 0) {
    diffVal = ((Number(current) - Number(last)) / unitType).toString();
    if (isFormatter) {
      if (isShowSign) {
        if (Number(diffVal) > 0) {
          return `+${numberFreeFormat(diffVal, customNumberFormatter)}`;
        } else {
          return numberFreeFormat(diffVal, customNumberFormatter);
        }
      }
      return numberFreeFormat(diffVal, customNumberFormatter);
    } else {
      return diffVal;
    }
  } else {
    return diffVal;
  }
}

/**
 * @description: NAN 转成0
 * @param {string} value
 * @return {*}
 */
export function nanBecomeZero(value: string) {
  if (value === 'NAN') {
    return 0;
  }
  return Number(value);
}
/**
 * @description 字符串转数值，带逗号的剔除逗号
 * @param str   数值字符串
 * @returns   数值
 */
export function valueConversion(str: string) {
  const num: number = str ? Number(str.replace(/,/g, '')) : 0;
  return num;
}
