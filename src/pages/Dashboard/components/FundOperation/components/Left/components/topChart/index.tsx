import React from 'react';
import styles from './index.less';
import Gauge from './gauge/index';
import type { dataItem } from '../../viewModel';
const topChart: React.FC<{
  data: dataItem;
}> = (props) => {
  const { data } = props;
  return (
    <div className={styles.topChart}>
      <div className={styles.left}>
        <div className={styles.top}>{data.name}</div>
        <div className={styles.middle}>
          {data.value}
          <span className={styles.middle_unit}>{data.unit}</span>
        </div>
        <div className={styles.bottom}>
          {data.jhlcName}:{data.jhlc}{' '}
        </div>
      </div>
      <Gauge value={data.zxl} />
    </div>
  );
};
export default topChart;
