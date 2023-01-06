/*
 * @Date: 2021-05-13 14:10:44
 * @LastEditors: Deshun
 * @LastEditTime: 2023-01-05 09:59:18
 * @FilePath: \big-screen-template\src\services\model\rootModel.ts
 * @Description: 基础对象
 */

export interface RootObject<T> {
  msgType: string;
  code: string;
  msg: string;
  data: T;
}
