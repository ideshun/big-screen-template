import { numberFormat } from '@/utils/viewFormat';
import { UnitType } from '@aec/utils';
export interface SubPeriodData {
  date: string;
  planOutFlow: string;
  realOutFlow: string;
  planInFlow: string;
  realInFlow: string;
}

export interface OutData {
  code: string;
  name: string;
  planOutFlow: string;
  realOutFlow: string;
}

export interface InData {
  code: string;
  name: string;
  planInFlow: string;
  realInFlow: string;
}

export interface GroupData {
  outData: OutData[];
  inData: InData[];
}

export interface Data {
  planOutFlow: string;
  realOutFlow: string;
  planInFlow: string;
  realInFlow: string;
  currentSubPeriod: string;
  subPeriodData: SubPeriodData[];
  groupData: GroupData;
}

export interface RootObject {
  msgType: string;
  code: string;
  msg: string;
  data: Data;
}
export interface dataItem {
  name: string;
  value: string;
  unit: string;
  jhlcName: string;
  jhlc: string;
  zxl: any;
}
export interface dataModel {
  sjlc?: dataItem;
  sjlr?: dataItem;
  sjxjl?: dataItem;
}
export async function getTopChartData(topData: Data) {
  // 调用接口 返回值样式
  let data: dataModel = {};
  data = {
    sjlc: {
      name: '实际流出',
      value: numberFormat(UnitType.HundredMillion as any, topData.realOutFlow),
      unit: '亿元',
      jhlcName: '计划流出',
      jhlc: numberFormat(UnitType.HundredMillion as any, topData.planOutFlow),
      zxl: Number(topData.realOutFlow) / Number(topData.planOutFlow),
    },
    sjlr: {
      name: '实际流入',
      value: numberFormat(UnitType.HundredMillion as any, topData.realInFlow),
      unit: '亿元',
      jhlcName: '计划流入',
      jhlc: numberFormat(UnitType.HundredMillion as any, topData.planInFlow),
      zxl: Number(topData.realInFlow) / Number(topData.planInFlow),
    },
    sjxjl: {
      name: '实际净现金流',
      value: numberFormat(UnitType.HundredMillion as any, topData.realInFlow),
      unit: '亿元',
      jhlcName: '计划流入',
      jhlc: numberFormat(UnitType.HundredMillion as any, topData.planInFlow),
      zxl: Number(topData.realInFlow) / Number(topData.planInFlow),
    },
  };
  return data;
}

export async function getMiddleChartData(fundRunAllData: Data, periodType: string) {
  const middleData = fundRunAllData?.subPeriodData;
  let xdata: string[] = [];
  let planOutFlow: number[] = [];
  let realOutFlow: number[] = [];
  let realInFlow: number[] = [];
  let areaColor: string[] = [];
  if (middleData) {
    middleData.forEach((item: { date: string; planOutFlow: string; realOutFlow: string; realInFlow: string }) => {
      xdata.push(item.date);
      if (item.date === fundRunAllData.currentSubPeriod) {
        areaColor.push('rgba(255,255,255,0.1)');
      } else {
        areaColor.push('rgba(255,255,255,0)');
      }
      planOutFlow.push(item.planOutFlow ? Number(item.planOutFlow) : 0);
      realOutFlow.push(item.realOutFlow ? Number(item.realOutFlow) : 0);
      realInFlow.push(item.realInFlow ? Number(item.realInFlow) : 0);
    });
  }
  const unitValue = periodType === 'W' ? UnitType.TentThousand : UnitType.HundredMillion;
  const unitName = periodType === 'W' ? '万元' : '亿元';
  const grid = {
    top: 70,
    right: 0,
    left: 9,
    bottom: 0,
    height: '65%',
    width: '98.6%',
  };
  // 处理x轴数据
  const xdataHadle = handleXdata(xdata, periodType);
  let yname = { W: '日计划', M: '周计划', Y: '月计划' }[periodType];
  return {
    xData: xdataHadle,
    seriesData: [planOutFlow, realOutFlow, realInFlow],
    yName: yname,
    areaColor: areaColor,
    unitValue: unitValue,
    grid: grid,
    unitName: unitName,
  };
}
function handleXdata(xdata: string[], periodType: string) {
  if (periodType === 'W') {
    return xdata.map((item: string, index: number) => {
      return getWeek(item);
    });
  } else if (periodType === 'M') {
    return xdata.map((item: string, index: number) => {
      return getMonth(item);
    });
  } else if (periodType === 'Y') {
    return xdata.map((item: string, index: number) => {
      return getYear(item);
    });
  }
}
// 底部数据图
export async function getBottomDatas(fundRunAllData: Data, periodType: string) {
  const unitValue = periodType === 'W' ? UnitType.TentThousand : UnitType.HundredMillion;
  const unitName = periodType === 'W' ? '万元' : '亿元';

  const bottomData = fundRunAllData.groupData;
  let yDataLeft: string[] = [];
  let yDataRight: string[] = [];
  let planOutFlow: string[] = [];
  let realOutFlow: string[] = [];
  let realInFlow: string[] = [];
  let leftInfo: any[] = [];
  let rightInfo: any[] = [];
  if (bottomData?.outData) {
    bottomData.outData.forEach((item: { name: string; planOutFlow: string; realOutFlow: string }) => {
      const leftInfoItem = { yDataLeft: item.name, planOutFlow: item.planOutFlow, realOutFlow: item.realOutFlow };
      leftInfo.push(leftInfoItem);
    });
    leftInfo = leftInfo.sort(compare('planOutFlow')).slice(0, 10);
    leftInfo = leftInfo.sort(compare2('planOutFlow'));
    leftInfo.forEach((item: any, index: any) => {
      yDataLeft.push(item.yDataLeft === null ? 0 : item.yDataLeft);
      planOutFlow.push(item.planOutFlow === null ? 0 : item.planOutFlow);
      realOutFlow.push(item.realOutFlow === null ? 0 : item.realOutFlow);
    });
  }
  if (bottomData?.inData) {
    bottomData.inData.forEach((item: { name: string; realInFlow: string }) => {
      const rightInfoItem = { yDataRight: item.name, realInFlow: item.realInFlow };
      rightInfo.push(rightInfoItem);
    });
    rightInfo = rightInfo.sort(compare('realInFlow')).slice(0, 10);
    rightInfo = rightInfo.sort(compare2('realInFlow'));

    yDataRight = [];
    realInFlow = [];
    rightInfo.forEach((item: any, index: any) => {
      yDataRight.push(item.yDataRight);
      realInFlow.push(item.realInFlow === null ? 0 : item.realInFlow);
    });
  }

  const seriesLeft = [
    {
      name: '计划流出',
      data: planOutFlow,
      type: 'bar',
      barWidth: 8,
      color: '#0955B3',
      showBackground: true,
      itemStyle: {
        normal: {
          label: {
            show: true,
            position: [-35, 0],
            formatter: function (a: any) {
              return numberFormat(unitValue as any, a.value, '0,0');
            },
            textStyle: {
              // 数值样式
              color: '#FFF',
              fontSize: 30,
              fontFamily: 'Din',
              align: 'right',
            },
          },
        },
      },
      backgroundStyle: {
        color: 'rgba(255,255,255,0.1)',
      },
    },
    {
      name: '实际流出',
      data: realOutFlow,
      type: 'bar',
      barWidth: 8,
      color: '#0CBDC3',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(255,255,255,0.1)',
      },
    },
  ];
  const seriesRight = [
    {
      name: '实际流入',
      data: realInFlow,
      type: 'bar',
      barWidth: 8,
      color: '#EB5E5E',
      showBackground: true,
      itemStyle: {
        normal: {
          label: {
            show: true,
            position: [-35, -9],
            formatter: function (a: any) {
              return numberFormat(unitValue as any, a.value ?? 0, '0,0');
            },
            textStyle: {
              // 数值样式
              color: '#FFF',
              fontSize: 30,
              align: 'right',
              fontFamily: 'Din',
            },
          },
        },
      },
      backgroundStyle: {
        color: 'rgba(255,255,255,0.1)',
      },
    },
  ];
  const data = {
    yDataLeft: yDataLeft,
    yDataRight: yDataRight,
    seriesLeft: seriesLeft,
    seriesRight: seriesRight,
    unitValue: unitValue,
    unitName: unitName,
  };
  return data;
}

function getWeek(dateString: string) {
  let year = dateString.slice(0, 4);
  let month = dateString.slice(4, 6);
  let day = dateString.slice(6, 8);
  let date = new Date(Number(year), Number(month) - 1, Number(day));
  return ['周' + '日一二三四五六'.charAt(date.getDay()) + '（' + Number(month) + '/' + Number(day) + '）', dateString];
}

function getMonth(dateString: string) {
  let month = dateString.slice(6, dateString.length);
  return ['第' + month + '周', dateString];
}

function getYear(dateString: string) {
  return [dateString, dateString];
}

function getCompare(yData: string[], planOutFlow: string[]) {
  let c = yData.map((s, i) => {
    return { a: s, b: planOutFlow[i] };
  });
  c.sort((v1, v2) => (v1.b > v2.b ? 1 : -1));
  c.forEach((o, i) => {
    yData[i] = o.a;
    planOutFlow[i] = o.b === null ? '0' : o.b;
  });
  return { value: yData, sortValue: planOutFlow };
}

function compare(property: any) {
  return function (a: string, b: string) {
    let value1 = a[property];
    let value2 = b[property];
    return Number(value2) - Number(value1);
  };
}
function compare2(property: any) {
  return function (a: string, b: string) {
    let value1 = a[property];
    let value2 = b[property];
    return Number(value1) - Number(value2);
  };
}
