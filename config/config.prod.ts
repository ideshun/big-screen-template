/*
 * @Author: ZY
 * @Date: 2021-08-02 11:55:09
 * @LastEditors: Deshun
 * @LastEditTime: 2023-01-05 09:46:20
 * @FilePath: \big-screen-template\config\config.prod.ts
 * @Description: umi配置
 */
import { defineConfig } from 'umi';
export default defineConfig({
  define: {
    'process.env.BASE_URL': '/api/',
    'process.env.WS_URL': 'wss://172.0.0.1/websocket',
  },
});
