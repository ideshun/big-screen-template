/*
 * @Author: ZY
 * @Date: 2021-05-26 09:26:32
 * @LastEditors: ZY
 * @LastEditTime: 2021-12-31 09:21:23
 * @FilePath: /shared-operation-finance-big-screen/src/apis/config.ts
 * @Description: 全局配置类接口
 */

import https from '@/utils/network/http';
import RemoteConfig from '@/settings/remoteConfig';
import type { RootObject } from './model/rootModel';
import type { StringElement } from '@/types/reqResult';
import type { RemoteConfigModel } from '@/services/model/config';

/**
 * @description: 获取远程配置接口
 */
export async function getRemoteConfig() {
  const res = await https.request<RootObject<RemoteConfigModel>>('/base/cfg');
  if (res?.data) {
    RemoteConfig.shared(res?.data);
  }
  return res?.data;
}

/**
 * @description: 获取指标单位
 */
export async function getElementUnits() {
  const res = await https.request<RootObject<StringElement>>('/base/ele_unit/list');
  return res?.data;
}
