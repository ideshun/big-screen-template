/*
 * @Author: ZY
 * @Date: 2021-06-01 15:23:24
 * @LastEditors: GXX
 * @LastEditTime: 2021-06-24 17:25:15
 * @FilePath: \economic-analysis-new\src\apis\model\orgModel.ts
 * @Description: 组织机构
 */

export interface OrgModel {
  [key: string]: any;
  redisCode: string;
  orgId: string;
  orgNo: string;
  orgKey: string;
  caption: string;
  title: string;
  lev: number;
  leaf: number;
  parentId: string;
  children: OrgModel[] | null;
}

export type OrgModelValue = OrgModel & {
  value: string;
  lastValue: string;
  diffRate: string;
};

export interface blockOrgModel {
  [key: string]: any;
  redisCode: string;
  orgId: string;
  title: string;
}

export type blockOrgModelValue = blockOrgModel & {
  scoreVal: string;
  rateVal: string;
};
