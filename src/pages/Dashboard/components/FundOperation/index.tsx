/*
 * @Author: ZY
 * @Date: 2022-02-07 19:55:40
 * @LastEditors: Deshun
 * @LastEditTime: 2023-01-05 09:32:38
 * @FilePath: \big-screen-template\src\pages\Dashboard\components\FundOperation\index.tsx
 * @Description: 资金运行首页
 */

import React from 'react';
import LeftComponent from './components/Left';
import Styles from "./index.less";

const IndexPage: React.FC<{}> = (props) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.left}>
        <LeftComponent />
      </div>
    </div>
  );
};
export default IndexPage;
