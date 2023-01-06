/* eslint-disable max-params */
/*
 * @Date: 2021-05-16 10:32:54
 * @LastEditors: Deshun
 * @LastEditTime: 2023-01-05 10:17:04
 * @FilePath: \big-screen-template\src\utils\period.ts
 * @Description: 期间工具函数处理
 */

import type { MomentInput, unitOfTime } from 'moment';
import moment from 'moment';
import RemoteConfig from '@/settings/remoteConfig';
import type { DPeriodsDateType } from '@/constant/index';
import { cloneDeep } from 'lodash';
/**
 * @description:  期间类型
 * D: 期间值
 * I: 实点值
 */
export enum PeriodsType {
  D = 'D',
  I = 'I',
}

class Periods {
  public type: PeriodsType;

  public constructor(type: PeriodsType) {
    this.type = type;
  }

  /**
   * @description: 求输入期间值
   * @param {unitOfTime} stepType  期间间距单位
   * @param {DPeriodsDateType} keyType 期间值末尾key
   * @param {number} stepCount 期间个数
   * @param {number} yearOffset 年偏移
   * @param {MomentInput} date  输入日期
   * @param {unitOfTime.Base} startType  year--累计 month--当期
   * @return {*}
   */
  public D_Trend({
    stepType,
    keyType,
    stepCount,
    yearOffset = 0,
    date = moment().endOf('M').toDate(),
    startType = stepType,
  }: {
    stepType: unitOfTime.Base;
    keyType: DPeriodsDateType;
    stepCount: number;
    yearOffset: number;
    date: MomentInput;
    startType?: unitOfTime.Base;
  }) {
    if (this.type === PeriodsType.I) {
      throw new Error('请选择实点类型使用');
    }
    let fromDate = moment(date).subtract(yearOffset, 'year');

    const periods = [];
    for (let index = 0; index < stepCount; index++) {
      const tempDate = cloneDeep(fromDate);
      const endOfDate =
        stepType === 'year'
          ? tempDate.endOf('months').format(RemoteConfig.getConfig.dateFormatDay)
          : tempDate.endOf(stepType).format(RemoteConfig.getConfig.dateFormatDay);

      const period =
        this.type +
        tempDate.startOf(startType).format(RemoteConfig.getConfig.dateFormatDay) +
        '-' +
        endOfDate +
        '-' +
        keyType;
      periods.push(period);

      fromDate = fromDate.add(-1, stepType);
    }
    return periods;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  DR_Trend(
    stepType: unitOfTime.Base,
    keyType: DPeriodsDateType,
    stepCount: number,
    yearOffset = 0,
    date: MomentInput = moment().endOf('M').toDate(),
    chartType: string,
  ) {
    if (this.type === PeriodsType.I) {
      throw new Error('请选择实点类型使用');
    }
    let transDate = date && moment(date).format('yyyy-MM-DD');
    let subMonth = (date as any).substring(4, 6);
    let fromDate = moment(date).subtract(yearOffset, 'year');

    const periods = [];
    let stepType_ym: any = '';
    let startOfDate: any = '';
    let endOfDate: any = '';
    for (let index = 0; index < stepCount; index++) {
      const tempDate = cloneDeep(fromDate);
      if (chartType === 'barLine') {
        startOfDate = tempDate.startOf('months').format(RemoteConfig.getConfig.dateFormatDay);
        endOfDate =
          stepType === 'month' ? tempDate.endOf('months').format(RemoteConfig.getConfig.dateFormatDay) : transDate; // '2021-11-30'
        stepType_ym = 'month';
      } else {
        startOfDate =
          stepType === 'year'
            ? tempDate.startOf(stepType).format(RemoteConfig.getConfig.dateFormatDay)
            : tempDate.startOf('year').format('YYYY') + '-' + subMonth + '-01';
        endOfDate = tempDate.endOf('year').format(RemoteConfig.getConfig.dateFormatDay); // D2021-11-01-2021-11-30
        stepType_ym = 'year';
      }
      const period = this.type + startOfDate + '-' + endOfDate + '-' + keyType;

      periods.push(period);
      fromDate = fromDate.add(-1, stepType_ym);
    }
    return periods;
  }

  public I_Trend({
    stepType,
    stepCount,
    yearOffset = 0,
    date = moment().endOf('M').toDate(),
  }: {
    stepType: unitOfTime.Base;
    stepCount: number;
    yearOffset: number;
    date: MomentInput;
  }) {
    if (this.type === PeriodsType.D) {
      throw new Error('请选择实际类型使用');
    }
    let fromDate = moment(date).add(-yearOffset, 'year');
    const periods = [];
    for (let index = 0; index < stepCount; index++) {
      const tempDate = cloneDeep(fromDate);
      let period = '';
      if (stepType === 'days') {
        period = this.type + tempDate.format(RemoteConfig.getConfig.dateFormatDay);
      } else {
        period = this.type + tempDate.endOf('month').format(RemoteConfig.getConfig.dateFormatDay);
      }

      fromDate = fromDate.subtract(1, stepType);
      periods.push(period);
    }
    return periods;
  }

  public I_endOfTrend({
    stepType,
    stepCount,
    yearOffset = 0,
    date = moment().endOf('M').toDate(),
  }: {
    stepType: unitOfTime.Base;
    stepCount: number;
    yearOffset: number;
    date: MomentInput;
  }) {
    if (this.type === PeriodsType.D) {
      throw new Error('请选择实际类型使用');
    }
    let fromDate = moment(date).add(-yearOffset, 'year').endOf(stepType);
    const periods = [];
    for (let index = 0; index < stepCount; index++) {
      const tempDate = cloneDeep(fromDate);
      const period = this.type + tempDate.endOf('months').format(RemoteConfig.getConfig.dateFormatDay);
      fromDate = fromDate.subtract(1, stepType);
      periods.push(period);
    }
    return periods;
  }
}

export default Periods;
