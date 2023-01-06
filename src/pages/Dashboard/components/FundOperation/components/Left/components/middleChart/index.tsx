import React, { useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import DefaultChartsOptions from '@/settings/defaultChartsOptions';
import { numberFormat, unitAutoShow } from '@/utils/viewFormat';
const middleChart: React.FC<{
  onClick: Function; // 点击事件
  areaColor: any;
  middleDatas: any;
}> = (props) => {
  const [zoomData, setZoomData] = useState([]);
  const { onClick, areaColor, middleDatas } = props;
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
                        ${data.seriesName}：${unitAutoShow(data.data, middleDatas.unitValue)}${middleDatas.unitName}
                    </span>
                  </div>`;
        });
        return string;
      },
    },
    legend: {
      data: ['计划流出', '实际流出', '实际流入'],
      top: '2%',
      x: 'right', // 居右显示
      textStyle: {
        color: 'rgba(255,255,255,0.45)',
        fontSize: 20,
        fontFamily: 'pingFangLight',
      },
    },
    xAxis: {
      type: 'category',
      data: middleDatas.xData,
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      splitArea: {
        show: true,
        interval: 0,
        areaStyle: {
          color: areaColor, // 这里重点，用于设置颜色的数组，
          // （有了这个属性，那我们完全可以自己在根据某些条件来生成这样一个数组）
        },
      },
      axisLabel: {
        show: true,
        interval: 0,
        fontFamily: 'pingFangLight',
        fontSize: 24,
        color: 'rgba(255,255,255,0.5)',
        formatter: function (value: string) {
          if (value) {
            return value.split(',')[0];
          } else {
            return '';
          }
        },
      },
    },

    yAxis: {
      name: middleDatas.yName,
      type: 'value',
      nameGap: 43,
      nameTextStyle: {
        // 坐标轴名称样式
        color: 'rgba(255,255,255,0.45)',
        fontSize: 30,
        fontFamily: 'pingFangLight',
        padding: [10, 0, 0, 65], // 坐标轴名称相对位置
      },
      axisLine: {
        // 坐标轴 轴线
        show: false,
      },
      axisLabel: {
        // 坐标轴的标签
        show: false, // 是否显示
        fontSize: 20,
        formatter(params: any) {
          return numberFormat(middleDatas.unitValue, params, '0,0');
        },
        color: 'rgba(255,255,255,0.5)',
        fontFamily: 'pingFangLight',
      },
      splitLine: {
        // gird 区域中的分割线
        show: true, // 是否显示
        lineStyle: {
          color: 'rgba(255,255,255,0.1)',
          width: 1,
        },
      },
    },
    grid: middleDatas.grid,
    series: [
      {
        name: '计划流出', // 坐标点名称
        type: 'bar', // 线类型
        barWidth: '20px',
        smooth: true,
        data: middleDatas.seriesData[0], // 坐标点数据
        itemStyle: {
          color: '#1B7BB3',
        },
      },
      {
        name: '实际流出', // 坐标点名称
        type: 'bar', // 线类型
        barWidth: '20px',
        smooth: true,
        data: middleDatas.seriesData[1], // 坐标点数据
        itemStyle: {
          color: '#21E1FF',
        },
      },
      {
        name: '实际流入', // 坐标点名称
        type: 'bar', // 线类型
        barWidth: '20px',
        smooth: true,
        data: middleDatas.seriesData[2], // 坐标点数据
        itemStyle: {
          color: '#EB4646',
        },
      },
    ],
  };
  const getDoms = (e: any) => {
    let echarts_react = e;
    if (echarts_react !== null) {
      let doms = echarts_react.getEchartsInstance()._api;
      let zoomData: number[] = [];
      doms.on('dataZoom', (event: any) => {
        if (event.batch) {
          zoomData = [event.batch[0].start, event.batch[0].end];
        } else {
          zoomData = [event.start, event.end];
        }
      });
      doms.getZr().off('click');
      doms.getZr().on('click', (p: any) => {
        const pointInPixel = [p.offsetX, p.offsetY];
        if (
          // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
          echarts_react !== null &&
          echarts_react.getEchartsInstance() !== null &&
          echarts_react.getEchartsInstance().containPixel('grid', pointInPixel)
        ) {
          // 执行代码
          if (zoomData.length) {
            setZoomData(zoomData);
          }
          onClick(clickBarContent[0]);
        }
      });
    }
  };
  return (
    <ReactEcharts option={option} style={{ height: '340px', width: '100%' }} notMerge={true} ref={(e) => getDoms(e)} />
  );
};
export default middleChart;
