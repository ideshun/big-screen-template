/*
 * @Author: ZY
 * @Date: 2021-05-26 08:51:17
 * @LastEditors: Deshun
 * @LastEditTime: 2023-01-05 10:10:43
 * @FilePath: \big-screen-template\src\settings\remoteConfig.ts
 * @Description: 服务器接收的config 可配置
 */

import { RemoteConfigModel } from '@/services/model/config';

export default class RemoteConfig {
  public static getConfig: RemoteConfigModel;
  private static instance: RemoteConfig | null = null;
  public static shared(config: RemoteConfigModel): RemoteConfig {
    if (this.instance === null) {
      this.instance = new RemoteConfig(config);
      RemoteConfig.getConfig = config;
    }
    return RemoteConfig.instance!;
  }

  public config: RemoteConfigModel;
  private constructor(config: RemoteConfigModel) {
    this.config = config;
  }
}
