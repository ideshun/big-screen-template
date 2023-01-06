/*
 * @Author: ZY
 * @Date: 2021-06-01 17:03:58
 * @LastEditors: GXX
 * @LastEditTime: 2022-01-18 10:34:26
 * @FilePath: \shared-operation-finance-big-screen\src\utils\orgManager.ts
 * @Description: 组织机构管理单例
 */

import type { OrgModel } from '@/services/model/orgModel';
import { getOrgList } from '@/services/org';

export class OrgManager {
  private static org: OrgManager;
  private static orgMap: Map<string, OrgModel>;
  private static orgList: OrgModel[];

  public static shared(): OrgManager {
    if (this.org === null) {
      this.org = new OrgManager();
    }
    return OrgManager.org;
  }

  // 过滤出Z和集团股份组织
  public static async getOrgList(isFilterOrgAndStock = true) {
    if (!OrgManager.orgList) {
      const list = await getOrgList();
      if (list) {
        OrgManager.orgList = list;
      }
    }
    let filterList: OrgModel[];
    if (isFilterOrgAndStock) {
      filterList = OrgManager.orgList.filter((item: OrgModel) => {
        return !(item.orgId.startsWith('Z') || item.orgId === '10' || item.orgId === '1010');
      });
    } else {
      filterList = OrgManager.orgList.filter((item: OrgModel) => {
        return !item.orgId.startsWith('Z');
      });
    }
    return filterList;
  }

  public static async getOrgMap() {
    if (!OrgManager.orgMap) {
      const list = await getOrgList();
      if (list) {
        OrgManager.orgMap = flatMapOrgList(list);
      }
    }
    return OrgManager.orgMap;
  }
}

function flatMapOrgList(list: OrgModel[]) {
  const orgMap = new Map<string, OrgModel>();
  function loopChildren(children: OrgModel[]) {
    for (const org of children) {
      orgMap.set(org.orgId, org);
      if (org.children) {
        loopChildren(org.children);
      }
    }
  }
  loopChildren(list);
  return orgMap;
}
