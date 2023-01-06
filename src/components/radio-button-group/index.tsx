/*
 * @Author: ZY
 * @Date: 2021-06-01 09:20:58
 * @LastEditors: GXX
 * @LastEditTime: 2022-01-11 16:07:07
 * @FilePath: \shared-operation-finance-big-screen\src\components\radio-button-group\index.tsx
 * @Description:  RadioButton
 */

import EventBus from '@/utils/eventBus';
import EventBusKey from '@/constant/eventBusKey';
import React, { useState } from 'react';
import styles from './index.less';

const RadioButtonGroup: React.FC<{
  options: string[];
  codes?: string[];
  className?: string;
  defaultSelected?: number;
  onItemBtnClick?: (itemIndex: number, itemValue: string) => void;
}> = (props) => {
  const { options, codes, defaultSelected, onItemBtnClick, className } = props;
  const [selectIndex, setSelected] = useState(defaultSelected);

  /**
   * @description: 组合tab子节点
   * @param {*}
   * @return {*}
   */
  const getTabsNode = () => {
    const items = [];
    for (let index = 0; index < options.length; index++) {
      items.push(
        <div
          className={`${styles.tabItem} ${selectIndex === index && styles.active}`}
          key={index}
          // eslint-disable-next-line @typescript-eslint/no-loop-func
          onClick={() => {
            setSelected(index);
            if (onItemBtnClick) {
              if (codes) {
                onItemBtnClick(index, codes[index]);
              } else {
                onItemBtnClick(index);
              }
            }
            EventBus.emit(EventBusKey.PlayStatusPauseKey);
          }}
        >
          {options[index]}
        </div>,
      );
    }
    return items;
  };

  return (
    <div className={styles.tabsBox}>
      <div className={`${styles.tabs} ${className && styles[className]}`}>{getTabsNode()}</div>
    </div>
  );
};
export default RadioButtonGroup;
