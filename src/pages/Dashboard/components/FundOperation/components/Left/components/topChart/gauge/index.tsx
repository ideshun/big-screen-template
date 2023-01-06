import React from 'react';
import ReactECharts from 'echarts-for-react';
import echarts from 'echarts';
import { numberFormat } from '@/utils/viewFormat';
const gauge: React.FC<{
  value: string;
}> = (props) => {
  const { value } = props;
  const option: any = {
    series: [
      {
        type: 'gauge',
        z: 1,
        radius: '82.8%',
        startAngle: 185,
        endAngle: -5,
        center: ['55%', '45%'],
        min: 0, // 仪表盘范围
        max: 100,
        axisLabel: {
          show: false,
        },
        splitNumber: 6, // 仪表盘刻度的分割段数
        axisLine: {
          lineStyle: {
            width: 14, // 线宽度
            color: [
              [
                1,
                new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    offset: 1,
                    color: '#45E6CB', // 0% 处的颜色
                  },
                  {
                    offset: 0.9,
                    color: '#4585E6', // 0% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: '#4585E6', // 0% 处的颜色
                  },
                  {
                    offset: 0.25,
                    color: '#FFAA00', // 0% 处的颜色
                  },
                  {
                    offset: 0.1,
                    color: '#FFAA00', // 0% 处的颜色
                  },
                  {
                    offset: 0,
                    color: '#FF3333', // 100% 处的颜色
                  },
                ]),
              ],
            ],
          },
        },
        pointer: {
          show: false,
        },
        axisTick: {
          // 短刻度线
          length: 10,
          lineStyle: {
            color: 'rgba(255,255,255,0.4)',
            width: 0,
          },
        },
        splitLine: {
          // 长刻度线
          distance: -30,
          length: 18,
          lineStyle: {
            color: '#0C101B',
            width: 4,
          },
        },
        title: {
          offsetCenter: [0, '4%'], // 设置title位置
          fontSize: 28,
          fontFamily: 'pingFangLight',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.8)',
        },
        detail: {
          fontSize: 50,
          offsetCenter: [0, '-28%'],
          valueAnimation: true,
          formatter: function (params: any) {
            if (params) {
              let val = numberFormat(1, params * 100, '0,0.0').toString();
              return `{a|${val.split('.')[0]}}{b|.${val.split('.')[1]}}{c|%}`;
            } else {
              return `{a|-}`;
            }
          },
          rich: {
            a: {
              fontSize: 48,
              fontWeight: 'bolder',
              fontFamily: 'Din',
              color: '#fff',
            },
            b: {
              fontSize: 30,
              fontWeight: 'bolder',
              fontFamily: 'Din',
              color: '#fff',
              padding: [0, 0, 10],
            },
            c: {
              fontSize: 30,
              color: '#fff',
              fontFamily: 'DigifaceWide',
              padding: [0, 0, 10],

              // padding: [0, 0, -20, 10]
            },
          },
          color: 'auto',
        },
        data: [
          {
            value: value,
            name: '执行率',
          },
        ],
      },
      {
        type: 'gauge',
        radius: '83%',
        startAngle: 185,
        endAngle: -5,
        z: 2,
        center: ['55%', '45%'],
        min: 0, // 仪表盘范围
        max: 100,
        axisLabel: {
          show: false,
        },
        splitNumber: 6, // 仪表盘刻度的分割段数
        axisLine: {
          lineStyle: {
            width: 15, // 线宽度
            color: [
              [value, 'rgba(38, 43, 56, 0)'],
              [1, '#262B38'],
            ],
          },
        },
        detail: {
          fontSize: 50,
          offsetCenter: [0, '-28%'],
          valueAnimation: true,
          formatter: function (params: any) {
            return '';
          },
          color: 'auto',
        },
        pointer: {
          show: false,
        },
        axisTick: {
          // 短刻度线
          show: false,
        },
        splitLine: {
          // 长刻度线
          show: false,
        },
      },
      {
        type: 'gauge',
        startAngle: 185,
        endAngle: -5,
        radius: '72%',
        center: ['55%', '45%'],
        min: 0, // 仪表盘范围
        max: 100,
        axisLabel: {
          show: false,
        },
        splitNumber: 6, // 仪表盘刻度的分割段数
        axisLine: {
          show: false,
        },
        detail: {
          fontSize: 50,
          offsetCenter: [0, '-28%'],
          valueAnimation: true,
          formatter: function (params: any) {
            return '';
          },
          color: 'auto',
        },
        pointer: {
          show: false,
        },
        axisTick: {
          // 短刻度线
          length: 7,
          lineStyle: {
            color: 'rgba(255,255,255,0.4)',
            width: 2,
          },
        },
        splitLine: {
          // 长刻度线
          show: false,
        },
      },
    ],
  };
  return <ReactECharts option={option} style={{ height: '400px', width: '540px' }} notMerge={true} />;
};
export default gauge;
