/*
 * @Author: ZY
 * @Date: 2021-08-02 11:55:09
 * @LastEditors: Deshun
 * @LastEditTime: 2023-01-05 10:21:07
 * @FilePath: \big-screen-template\config\config.ts
 * @Description: umi配置
 */
import { defineConfig } from 'umi';
import routes from './routes';
import fs from 'fs';
const remScriptStr = fs.readFileSync(require.resolve('../scripts/rem.js'), 'utf8');

export default defineConfig({
  define: {
    'process.env.BASE_URL': '/api/',
    'process.env.WS_URL': 'ws://172.0.0.1/websocket',
  },
  routes,
  hash: true,
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  devServer: {
    port: 8130,
    open: true,
  },
  dynamicImportSyntax: {},
  fastRefresh: {},
  headScripts: [remScriptStr],
});
