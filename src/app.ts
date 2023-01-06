/*
 * @Author: ZY
 * @Date: 2021-05-31 18:30:17
 * @LastEditors: Deshun
 * @LastEditTime: 2023-01-05 10:31:41
 * @FilePath: \big-screen-template\src\app.ts
 * @Description: 运行时文件
 */
import { history } from 'umi';
import RemoteConfig from '@/settings/remoteConfig';
import type { RemoteConfigModel } from './services/model/config';

export function render(oldRender: any) {
  const logged = sessionStorage.getItem('logged') || localStorage.getItem('logged');
  if (!logged) {
    history.push('/auth');
  }

  const model: RemoteConfigModel = {
    dataLastMonth: '20210630',
    dateFormatMonth: 'YYYY-MM',
    dateFormatDay: 'YYYY-MM-DD',
    decimalPrecision: 1,
    percentPrecision: 2,
    defaultCcy: '3f3',
    defaultStockCompany: '4c3',
    defaultCompany: '3e9',
    defaultNumberFormatter: '0,0.0',
    defaultNumberHMDecimalFormatter: '0,0.0',
    defaultPercentFormatter: '0.0%',
  };

  RemoteConfig.shared(model);
  RemoteConfig.getConfig.defaultCompany = '10';
  RemoteConfig.getConfig.defaultStockCompany = '1010';
  oldRender();
}
