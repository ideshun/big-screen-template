/*
 * @Author: yar
 * @Date: 2022-01-11 09:17:46
 * @LastEditTime: 2023-01-05 09:39:05
 * @LastEditors: Deshun
 * @Description:
 * @FilePath: \big-screen-template\src\pages\Dashboard\components\ToolHeader\index.tsx
 */
import React, { useContext, useEffect, useState } from 'react';
import { Radio } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import type { RadioChangeEvent, DatePickerProps } from 'antd';
import DatePickerBox from './components/DatePicker';
import EventBus from '@/utils/eventBus';
import EventBusKey from '@/constant/eventBusKey';
import context from '@/constant/context';
import { CompanyModel } from '@/constant/company';
import playPng from '../../../../asset/play.png';
import pausePng from '../../../../asset/pause.png';
import styles from './index.less';

const WeatherTime: React.FC<{ playStatus: boolean; playButtonClick: any }> = (props) => {
  const { playButtonClick, playStatus } = props;
  const [nowTime, setNowTime] = useState<string>('');
  const [nowDate, setNowDate] = useState<string>('');
  const { globalDate, setGlobalDate } = useContext(context);
  const [changeDate, setChangeDate] = useState<boolean>(false);

  // 获取时间
  const getTime = () => {
    const timer = setInterval(() => {
      updateTime();
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  };

  function updateTime() {
    const cd = new Date();
    setNowTime(
      zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2),
    );
    setNowDate(
      zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth() + 1, 2) + '-' + zeroPadding(cd.getDate(), 2),
    );
  }

  function zeroPadding(num: any, digit: any) {
    let zero = '';
    for (let i = 0; i < digit; i++) {
      zero += '0';
    }
    return (zero + num).slice(-digit);
  }

  useEffect(() => {
    getTime();
  }, []);

  const onChangeCompany = (e: RadioChangeEvent) => {
    EventBus.emit(EventBusKey.CompanySelectKey, e.target.value);
  };
  const returnSelectDate = () => {
    if (changeDate) {
      return <div className={styles.toolDate}>{moment(globalDate).format('YYYY年MM月DD日')}</div>;
    } else {
      return (
        <>
          <div className={styles.toolDate}>{nowDate}</div>
          <div className={styles.toolTime}>{nowTime}</div>
        </>
      );
    }
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
    setGlobalDate(date ? date.format('YYYYMMDD') : moment().format('YYYYMMDD'));
    setChangeDate(true);
  };
  return (
    <>
      <div className={styles.toolContainer}>
        <div className={styles.playButton} onClick={playButtonClick}>
          <img src={playStatus ? pausePng : playPng} />
        </div>
        <div style={{ marginRight: '16px' }}>
          <Radio.Group defaultValue={CompanyModel.group} buttonStyle="solid" size="large" onChange={onChangeCompany}>
            <Radio.Button value={CompanyModel.group}>集团</Radio.Button>
            <Radio.Button value={CompanyModel.list}>上市</Radio.Button>
            <Radio.Button value={CompanyModel.unlisted}>未上市</Radio.Button>
          </Radio.Group>
        </div>
        {returnSelectDate()}
      </div>
      <div className={styles.datePickerBox}>
        <DatePickerBox onChange={onChange} />
      </div>
    </>
  );
};
export default WeatherTime;
