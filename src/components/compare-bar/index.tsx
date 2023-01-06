/*
 * @Author: jld
 * @Date: 2022-03-18 17:34:02
 * @LastEditTime: 2022-03-29 09:37:23
 * @LastEditors: jld
 * @Description:
 * @FilePath: \shared-operation-capital-big-screen\src\components\compare-bar\index.tsx
 */
import React from 'react';
import ReactEcharts from 'echarts-for-react';
import DefaultChartsOptions from '@/settings/defaultChartsOptions';
import { unitAutoShow, UnitType } from '@aec/utils';

const compareBar: React.FC<{
  yData: string[];
  series: any;
  unitValue: UnitType | undefined;
  unitName: string;
}> = (props) => {
  const { yData, series, unitValue, unitName } = props;
  let clickBarContent: any = ''; // 装载点击事件的内容
  const option: any = {
    tooltip: {
      ...DefaultChartsOptions.toolTip,
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
      confine: true, //  是否将 tooltip 框限制在图表的区域内。当图表外层的 dom 被设置为 'overflow: hidden'，或者移动端窄屏，导致 tooltip 超出外界被截断时，此配置比较有用。
      borderWidth: 0,
      extraCssText: 'box-shadow:0 0 18px rgba(255,255,255,0.7)',
      padding: [10, 20, 10, 20],
      backgroundColor: 'rgba(255,255,255,0.8)', // 通过设置rgba调节背景颜色与透明度
      textStyle: {
        color: 'rgba(0,0,0,0.8)',
      },
      position: 'top',
      formatter: function (params: any) {
        let string = params[0].name.split(',')[0];
        params.forEach((data: any) => {
          clickBarContent = params;
          string += `<div><span
                    style="background-color: ${data.color};
                    width: 10px;
                    height: 10px;
                    display: inline-block;
                    border-radius: 5px;
                    ">
                    </span>
                    <span style="padding: 0px 15px 0px 15px">
                        ${data.seriesName}：${unitAutoShow(data.data, unitValue, '0,0')}${unitName}
                    </span>
                  </div>`;
        });
        return string;
      },
    },
    grid: {
      top: 0,
      right: 0,
      left: 300,
      bottom: 0,
      height: '100%',
      width: '57%',
    },
    xAxis: {
      type: 'value',
      show: false, // 是否显示
    },
    yAxis: {
      type: 'category',
      data: yData,
      axisLabel: {
        // 坐标轴标签
        show: true, // 是否显示
        fontSize: 24,
        fontFamily: 'pingFangLight',
        margin: 300, // 刻度标签与轴线之间的距离
        color: 'rgba(255,255,255,0.7)', // 默认取轴线的颜色
        textStyle: {
          align: 'left',
        },
      },
      axisTick: {
        // 坐标轴的刻度
        show: false,
      },
      axisLine: {
        // 坐标轴 轴线
        show: false,
      },
    },
    series: series,
  };
  return <ReactEcharts option={option} style={{ height: '485px', width: '100%' }} notMerge={true} />;
};
export default compareBar;
