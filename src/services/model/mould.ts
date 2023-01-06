/*
 * @Author: Deshun
 * @Date: 2021-12-23 17:13:23
 * @LastEditors: Deshun
 * @LastEditTime: 2021-12-27 11:39:35
 * @FilePath: \economic-analysis-new\src\apis\model\mould.ts
 * @Description: 模板相关 model
 */

export interface MouldConfigModel {
  loginUser: {
    defOrgCmpId: string;
    defOrgId: string;
    defOrgName: string;
    ownerOrgList: MouldProps[];
  };
}

export interface RemoteMouldModel {
  disMould: {
    orgCmpId: string;
    orgId: string;
    orgName: string;
    isDef?: string;
  };
  mouldList: MouldProps[]; // 模板列表
}

export interface MouldProps {
  orgCmpId: string; // 机构id  '4b8';
  orgName: string; // 机构名称'华油集团';
  isDef: string; // '0';
  orgId: string; // '10002222';
}
