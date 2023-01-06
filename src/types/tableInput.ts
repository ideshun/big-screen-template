/*
 * @Author: GXX
 * @Date: 2022-01-10 14:55:38
 * @LastEditors: ZY
 * @LastEditTime: 2022-01-17 14:30:59
 * @FilePath: /shared-operation-finance-big-screen/src/types/tableInput.ts
 * @Description: 数据库中的表
 */
interface ConditionsModel {
  field: string;
  opt: string;
  val: string;
}
export interface tableInput {
  table: string;
  fields: string;
  conditions?: ConditionsModel[];
}
