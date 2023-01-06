/*
 * @Date: 2021-05-12 15:19:58
 * @LastEditors: ZY
 * @LastEditTime: 2022-01-17 14:29:44
 * @FilePath: /shared-operation-finance-big-screen/src/utils/network/http.ts
 * @Description: 封装网络请求
 */

import HttpClient from 'axios-mapper';
import type { HttpClientConfig } from 'axios-mapper';
import networkConfig from './config';
import { notification } from 'antd';

const config: HttpClientConfig = {
  baseURL: networkConfig.baseUrl,
  log: false,
  checkQuickClick: false,
  headers: {
    token: '',
  },
};

const https = new HttpClient(config);

// 返回拦截，错误显示&处理
https.httpClient.interceptors.response.use(
   (response) => {
    // 一定要返回才可以继续
    if (response.status !== 200) {
      notification.error({
        description: `${response.status}服务器返回异常`,
        message: '服务器异常',
      });
    }
    return response;
  },
  (error) =>{
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
    return Promise.reject(error);
  },
);

export default https;
