/*
 * @Author: ZY
 * @Date: 2021-06-01 15:15:41
 * @LastEditors: Deshun
 * @LastEditTime: 2023-01-05 10:02:12
 * @FilePath: \big-screen-template\src\services\org.ts
 * @Description: 组织结构相关接口
 */

import https from '@/utils/network/http';
import type { RootObject } from './model/rootModel';
import type { OrgModel } from './model/orgModel';

/**
 * @description: 获取组织机构列表
 * @param {*}
 * @return {*}
 */
export async function getOrgList() {
  const res = await https.request<RootObject<OrgModel[]>>('base/org/list');
  return res?.data;
}
