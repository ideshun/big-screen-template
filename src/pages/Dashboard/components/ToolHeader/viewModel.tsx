/*
 * @Author: yar
 * @Date: 2022-01-11 10:09:17
 * @LastEditTime: 2023-01-06 08:53:28
 * @LastEditors: Deshun
 * @Description:
 * @FilePath: \big-screen-template\src\pages\Dashboard\components\ToolHeader\viewModel.tsx
 */
import https from '@/utils/network/http';
import { Method } from 'axios-mapper';
import type { RootObject } from '@/services/model/rootModel';
import type { StringElement } from '@/types/reqResult';

export async function getWeatherData() {
  const result = await https.request<RootObject<StringElement>>(`/proxy/weather/北京`, Method.GET);
  return result?.data;
}
