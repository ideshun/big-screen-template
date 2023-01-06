/*
 * @Date: 2021-05-14 09:14:12
 * @LastEditors: ZY
 * @LastEditTime: 2022-01-17 14:38:22
 * @FilePath: /shared-operation-finance-big-screen/src/settings/defaultConfig.ts
 * @Description: 全局默认配置
 */
import { UnitType } from '@/constant/unit';

interface EADefaultConfig {
  // 单位需要自动转换的最大值
  UnitTransFormMaxValue: number;
  // 单位自动转换层级数组
  UnitTransFromLeavelArray: Unit[];
}
interface Unit {
  label: string;
  value: number;
}

const defaultConfig: EADefaultConfig = {
  UnitTransFormMaxValue: 0.05,
  UnitTransFromLeavelArray: [
    { label: '元', value: UnitType.Individual },
    { label: '万元', value: UnitType.TentHousand },
    { label: '亿元', value: UnitType.HundredMillion },
  ],
};

export default defaultConfig;
