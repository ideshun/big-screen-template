/*
 * @Date: 2021-05-14 09:09:43
 * @LastEditors: Deshun
 * @LastEditTime: 2023-01-05 10:03:49
 * @FilePath: \big-screen-template\src\types\reqInput.ts
 * @Description: 请求入参类型
 */
export interface RequestParams {
  // 组织机构类型
  companiesType?: 'code' | 'id';
  // 机构
  companies?: string[];
  // 指标
  elements?: string[];
  // 指标类型（code/id  编码/ID)，无此参数默认使用ID
  elementsType?: string;
  // 纬度
  dimensions?: string[];
  // 期间
  periods?: string[];
  // 搜索指标
  queryStr?: string[];
  // 维度编码类型
  dimensionsType?: 'code' | 'id';
}
