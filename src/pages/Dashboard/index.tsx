/*
 * @Author: ZY
 * @Date: 2021-08-06 12:02:00
 * @LastEditors: Deshun
 * @LastEditTime: 2023-01-06 08:54:04
 * @FilePath: \big-screen-template\src\pages\Dashboard\index.tsx
 * @Description: indexPage 页面
 */
import React, { useEffect, useRef, useMemo, useState } from 'react';
import moment from 'moment';
import ToolHeader from './components/ToolHeader';
import FundOperation from './components/FundOperation';
import EventBus from '@/utils/eventBus';
import EventBusKey from '@/constant/eventBusKey';
import Context from '@/constant/context';
import styles from './index.less';

// const Context=
const IndexPage: React.FC<{}> = () => {
  // 全局日期
  const [globalDate, setGlobalDate] = useState<string>(moment().format('YYYYMMDD'));
  const instData = useState<string>(moment().format('YYYYMMDD'));
  let playRef = useRef(true); // 是否播放
  // 轮播状态，默认播放，可以暂停
  const [playStatus, setPlayStatus] = useState(true);
  // 暂停播放toggle方法
  const playButtonClick = () => {
    playRef.current = !playStatus;
    setPlayStatus((p) => !p);
  };

  useEffect(() => {
    playRef.current = true;
    let index = 0;
    const refreshInterval = setInterval(() => {
      if (playRef.current) {
        EventBus.emit(EventBusKey.IntervalRefreshKey, globalDate);
        index = 0;
      } else {
        index = index + 1;
        if (index > 12) {
          index = 0;
          playRef.current = true;
          setPlayStatus(true);
        }
      }
    }, 20000);

    const currentTimeInterval = setInterval(() => {
      if (playRef.current) {
        EventBus.emit(EventBusKey.CurrentTimeKey);
      }
    }, 10000);
    return () => {
      clearInterval(refreshInterval);
      clearInterval(currentTimeInterval);
    };
  }, []);

  const suspend = () => {
    playRef.current = false;
    setPlayStatus(false);
    return;
  };
  const contextValue = useMemo(
    () => ({ suspend, globalDate, instData, setGlobalDate }),
    [suspend, instData, globalDate],
  );
  return (
    <Context.Provider value={contextValue}>
      <div className={styles.container}>
        <div className={styles.toolHeader}>
          <ToolHeader playButtonClick={playButtonClick} playStatus={playStatus} />
        </div>
        <div className={styles.content}>
          <div className={styles.fundOperation}>
            <FundOperation />
          </div>
        </div>
      </div>
    </Context.Provider>
  );
};
export default IndexPage;
