/*
 * @Author: ZLL
 * @Date: 2022-02-08 11:09:57
 * @LastEditors: Deshun
 * @LastEditTime: 2022-06-01 11:38:32
 * @FilePath: \shared-operation-capital-big-screen\src\components\tabs\index.tsx
 * @Description: 文件描述
 */
import React from 'react';
import styles from './index.less';
import { Tabs } from 'antd';

interface TabsModel {
  getTabPane: Function;
  activeKey: string;
  defaultActiveKey?: string;
  callbackProps?: ((activeKey: string) => void) | undefined;
  borderTabs?: boolean;
  tabBarGutter?: number;
  tabBarExtraContent?: any;
  unit?: string; // 单位
}
const IndexPage: React.FC<TabsModel> = (props) => {
  const { getTabPane, defaultActiveKey, callbackProps, borderTabs, tabBarGutter, activeKey, tabBarExtraContent, unit } =
    props;
  function callback(key: string) {}

  return (
    <div className={`${styles.tabs} ${borderTabs ? styles.borderTabs : ''}`}>
      {unit && <div className={styles.unit}>(单位：{unit})</div>}
      <Tabs
        defaultActiveKey={defaultActiveKey === undefined ? '1' : defaultActiveKey}
        onChange={callbackProps ?? callback}
        tabBarGutter={tabBarGutter ?? 63}
        activeKey={activeKey}
        destroyInactiveTabPane={true}
        tabBarExtraContent={tabBarExtraContent ?? ''}
      >
        {getTabPane()}
      </Tabs>
    </div>
  );
};
export default IndexPage;
