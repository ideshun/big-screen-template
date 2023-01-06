/*
 * @Author: ZY
 * @Date: 2021-05-24 18:55:39
 * @LastEditors: ZY
 * @LastEditTime: 2022-01-17 14:37:08
 * @FilePath: /shared-operation-finance-big-screen/src/settings/defaultChartsOptions.ts
 * @Description: echarts 默认配置
 */

import type { EChartOption } from 'echarts';
import { unitAutoShow } from '@/utils/viewFormat';
class DefaultEchartOptions {
  public static toolTip: EChartOption.Tooltip = {
    trigger: 'axis',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'line', // 默认为直线，可选为：'line' | 'shadow'
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
      let string = params[0].name.replace('/-/g', '') || '';
      params.forEach((data: any) => {
        string += `<div><span
                    style="background-color: ${data.color};
                    width: 10px;
                    height: 10px;
                    display: inline-block;
                    border-radius: 5px;
                    ">
                    </span>
                    <span style="padding: 0px 15px 0px 15px">
                        ${data.seriesName}：${unitAutoShow(data.value)}
                    </span>
                  </div>`;
      });
      return string;
    },
  };
}

export default DefaultEchartOptions;
