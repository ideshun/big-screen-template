/*
 * @Author: ZLL
 * @Date: 2022-03-15 17:53:52
 * @LastEditors: Deshun
 * @LastEditTime: 2023-01-05 10:21:59
 * @FilePath: \big-screen-template\src\constant\context.ts
 * @Description: 文件描述
 */
import React from 'react';
import moment from 'moment';

export interface GlobalContext {
  suspend: any;
  globalDate: string;
  instData: any;
  setGlobalDate: any;
}

export default React.createContext<GlobalContext>({
  suspend: () => {},
  instData: '',
  globalDate: moment().format('YYYYMMDD'),
  setGlobalDate: () => {},
});
