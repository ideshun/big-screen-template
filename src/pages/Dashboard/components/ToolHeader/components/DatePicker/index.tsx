/*
 * @version:
 * @Author: ZHJ
 * @Date: 2022-09-07 10:08:51
 * @LastEditors: zhj
 * @LastEditTime: 2022-09-07 10:18:36
 * @Description:
 */
import { DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
import styles from './index.less';
import React from 'react';
const DatePickerBox: React.FC<{ onChange: (date: any, dateString: string) => void }> = (props) => {
  const { onChange } = props;
  return (
    <div className={styles.container}>
      <DatePicker
        locale={locale}
        className={styles.changeDate}
        onChange={onChange}
        dropdownClassName={styles.pickerName}
      />
    </div>
  );
};
export default DatePickerBox;
