/*
 * @Date: 2021-05-12 11:33:29
 * @LastEditors: ZY
 * @LastEditTime: 2021-05-18 09:59:45
 * @FilePath: /economic-analysis-new/src/utils/network/config.ts
 * @Description: 网络相关配置类
 */

interface NetWorkConfig {
  baseUrl: string | undefined;
}

const config: NetWorkConfig = {
  baseUrl: process.env.BASE_URL,
};

export default config;
