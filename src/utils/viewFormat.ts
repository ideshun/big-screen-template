/*
 * @LastEditors: Deshun
 * @LastEditTime: 2022-01-21 09:49:54
 * @FilePath: \shared-operation-finance-big-screen\src\utils\viewFormat.ts
 * @Description: 显示格式化
 */
import moment from 'moment';
import { format } from 'numerable';
import { UnitType } from '@/constant/unit';
import { CustomDateFormat, DPeriodsDateType } from '@/constant/index';
import RemoteConfig from '@/settings/remoteConfig';
import DefaultConfig from '@/settings/defaultConfig';

/**
 * 根据单位将数据进行格式化
 * @param unit
 * @param val
 * @returns
 */
export function numberFormat(
  type: UnitType = UnitType.Individual,
  val: string | number,
  customNumberFormatter: string = RemoteConfig.getConfig.defaultNumberHMDecimalFormatter,
) {
  if (val === 'NAN' || val === null || val === undefined) {
    return '-';
  }
  return format(Number(val) / type, customNumberFormatter);
}

/**
 * 将数据进行格式化
 * @param val
 * @returns
 */
export function numberFreeFormat(
  val: string | number,
  customNumberFormatter: string = RemoteConfig.getConfig.defaultNumberHMDecimalFormatter,
) {
  if (val === 'NAN' || !val) {
    return '-';
  }
  return format(Number(val), customNumberFormatter);
}

/**
 * @description: 转换成百分数
 * @param {number} 值
 * @return 百分数
 */
export function numberPercent(
  value: number | string,
  customPercentFormatter: string = RemoteConfig.getConfig.defaultPercentFormatter,
) {
  if (value === 'NAN' || !value) {
    return '-';
  }
  const num = Number(value);
  return format(num, customPercentFormatter);
}

/**
 * @description: 关于数值显示，单位差距较大,计算值小于默认自动转换精度。 需要自动降级显示单位
 * @param {number} 真实显示数值
 * @param {UnitType} defaultUnitType  整体显示单位标准
 * @return 如果不需要转换，则直接返回数值，否则降级然后加上单位
 */
export function unitAutoShow(
  value: number | string,
  defaultUnitType: UnitType = UnitType.HundredMillion,
  formatter: string = RemoteConfig.getConfig.defaultNumberHMDecimalFormatter,
) {
  if (value === 'NAN' || value === null || value === undefined) {
    return '-';
  }

  let numberVal = Number(value) / defaultUnitType;
  const leavelValues = DefaultConfig.UnitTransFromLeavelArray.map((item) => item.value);
  let index = leavelValues.indexOf(defaultUnitType);
  let needLabel = false;
  while (
    (numberVal <= DefaultConfig.UnitTransFormMaxValue && numberVal > 0) ||
    (numberVal >= -DefaultConfig.UnitTransFormMaxValue && numberVal < 0)
  ) {
    index--;
    numberVal = Number(value) / leavelValues[index];
    needLabel = true;
    if (isNaN(numberVal)) {
      numberVal = 0;
    }
  }

  return needLabel && index !== -1
    ? `${format(numberVal, formatter)}${DefaultConfig.UnitTransFromLeavelArray[index].label}`
    : format(numberVal, formatter);
}

/**
 * @description: 格式化服务器返回是实点型日期格式化
 *  实点值: I2021-05-28-00010007
 * @param {string} date
 * @param {string} format: moment的 format 格式
 * @return {*}
 */
export function viewFormatIDateResultDate(
  date: string,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  format: string = RemoteConfig.getConfig.dateFormatDay,
) {
  // eslint-disable-next-line no-param-reassign
  date = date.replace('I', '');
  // eslint-disable-next-line no-param-reassign
  date = date.substr(0, 10);
  return moment(date).format(format);
}

/**
 * @description: 格式化服务器返回期间值日期格式化
 *  期间值：D2021-03-01-2021-03-31-0000100007
 * @param {string} date
 * @param {string} format: 自定义格式
 * @return {*}
 */
export function viewFormatDDateResultDate(
  date: string,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  format: string = CustomDateFormat['YYYY-MM=>MM'],
) {
  let startDate = date.substr(0, 11);
  startDate = startDate.replace('D', '');
  const endDate = date.substr(12, 10);
  const dateType = date.substr(23);
  const startDatesArray = startDate.split('-');
  const endDatesArray = endDate.split('-');
  // 如果是季度,
  if (DPeriodsDateType.BQ === dateType) {
    if (format === CustomDateFormat['YYYY-Q']) {
      const quarter = moment(endDate).quarter();
      return `${startDatesArray[0]}年第${quarter}季`;
    }
  } else if (DPeriodsDateType.BY === dateType) {
    if (format === CustomDateFormat['YYYY-MM=>MM']) {
      if (startDatesArray[1] === endDatesArray[1]) {
        return `${startDatesArray[0]}年${startDatesArray[1]}月`;
      } else {
        return `${startDatesArray[0]}年${startDatesArray[1]}-${endDatesArray[1]}月`;
      }
    }
    if (format === CustomDateFormat['YYYY=>YYYY']) {
      return `${startDatesArray[0]}-${endDatesArray[0]}年`;
    }
    if (format === CustomDateFormat['YYYY-M=>M']) {
      if (startDatesArray[1] === endDatesArray[1]) {
        return `${startDatesArray[0]}年${Number(startDatesArray[1])}月`;
      } else {
        return `${startDatesArray[0]}年${Number(startDatesArray[1])}-${Number(endDatesArray[1])}月`;
      }
    }
  } else if (DPeriodsDateType.BM === dateType) {
    if (format === CustomDateFormat['YYYY-MM=>MM']) {
      return `${startDatesArray[0]}年${startDatesArray[1]}-${endDatesArray[1]}月`;
    }
  } else if (DPeriodsDateType.BD === dateType) {
    if (format === CustomDateFormat['YYYY-MM-DD=>DD']) {
      return `${startDatesArray[0]}年${startDatesArray[0]}月${startDatesArray[2]}-${endDatesArray[2]}月`;
    }
  }
  return [moment(startDate).format(format), moment(endDate).format(format)];
}

export const formatInstDate = (data: string, dataType: string) => {
  let strData;
  if (dataType === 'year') {
    if (data.slice(4, 6) === '01') {
      strData = `${data.slice(0, 4)}年1月`;
    } else {
      strData = `${data.slice(0, 4)}年1-${parseInt(data.slice(4, 6), 10)}月`;
    }
  }
  if (dataType === 'month') {
    strData = `${data.slice(0, 4)}年${parseInt(data.slice(4, 6), 10)}月`;
  }
  if (dataType === 'season') {
    if (data.slice(4, 6) === '03') {
      strData = `${data.slice(0, 4)}年一季度`;
    }
    if (data.slice(4, 6) === '06') {
      strData = `${data.slice(0, 4)}年二季度`;
    }
    if (data.slice(4, 6) === '09') {
      strData = `${data.slice(0, 4)}年三季度`;
    }
    if (data.slice(4, 6) === '12') {
      strData = `${data.slice(0, 4)}年四季度`;
    }
  }
  return strData;
};

/**
 * @description: 默认日期格式转换
 * @param {string} insType 日期类型
 * @param {string} date 日期
 * @return {*}
 */
export function insDateFormat(insType = 'year', date: string = RemoteConfig.getConfig.dataLastMonth) {
  const year = date.slice(0, 4);
  const month = parseInt(date.slice(4, 6), 10);
  if (insType === 'year') {
    if (month === 1) {
      return year + '年' + month + '月';
    }
    return year + '年1-' + month + '月';
  }
  if (insType === 'month') {
    if (month === 1) {
      return year + '年' + month + '月';
    }
    return month + '月';
  }
  return '';
}

/**
 * @description x轴格式化标准(年)
 * @param value 源数据
 * @param index
 * @returns
 */
export function axisLabelYearFormatter(value: any) {
  return value.split('年')[0];
}

/**
 * @description x轴格式化标准(月 -- 当期)
 * @param value 源数据 xxxx年x月(2021年6月)
 * @param index
 * @returns
 */
export function axisLabelMonthFormatter(value: any, index: number) {
  const dateArr = value.split('年');
  const year = dateArr[0];
  let month = dateArr[1].split('月')[0];
  if (Number(month) < 10) {
    month = `0${parseInt(month, 10)}`;
  }
  if (index === 0 || value.indexOf('年1月') > -1) {
    return `${year}${month}`;
  }
  return month;
}

/**
 * @description x轴格式化标准(月 -- 累计)
 * @param value 源数据 xxxx年1-x月 xxxx年1月(2021年1-6月, 2021年1月)
 * @param index
 * @returns
 */
export function axisLabelMonthFormatterYear(value: any, index: number) {
  const dateArr = value.split('年');
  const year = dateArr[0];
  let month = dateArr[1].split('月')[0].split('-')[1];
  if (Number(month) < 10) {
    month = '0' + month;
  }
  if (value.indexOf('年1月') > -1) {
    return `${year}01`;
  }
  if (index === 0) {
    return `${year}${month}`;
  }
  return month;
}

/**
 * @description x轴格式化标准(日)
 * @param value 源数据
 * @param index
 * @returns
 */
export function axisLabelDayFormatter(value: any, index: number) {
  const dateArr = value.split('年');
  const monthArr = dateArr[1].split('月');
  const dayArr = monthArr[1].split('日');
  const year = dateArr[0];
  const month = monthArr[0];
  const day = dayArr[0];

  if (index === 0 || (month === 1 && day === 1)) {
    return `${year}/${month}/${day}`;
  } else if (day === 1) {
    return `${month}/${day}`;
  } else if (day % 5 === 0) {
    return `${day}`;
  } else {
    return '';
  }
}
