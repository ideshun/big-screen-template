/*
 * @Author: ZY
 * @Date: 2022-02-07 20:07:07
 * @LastEditors: Deshun
 * @LastEditTime: 2023-01-05 10:48:43
 * @FilePath: \big-screen-template\src\pages\Dashboard\components\FundOperation\components\Left\index.tsx
 * @Description: 资金运行左边模块
 */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import styles from './index.less';
import TabsComponent from '@/components/tabs';
import { Tabs } from 'antd';
import CompareBar from '@/components/compare-bar';
import TopChart from './components/topChart/index';
import MiddleBarChart from './components/middleChart/index';
import RadioButtonGroup from '@/components/radio-button-group';
import { getTopChartData, getMiddleChartData, getBottomDatas, Data } from './viewModel';
import type { dataModel } from './viewModel';
import { EventBusKey } from '@/constant';
import EventBus from '@/utils/eventBus';
import context from '@/constant/context';
import useWebSocket from 'react-use-websocket';
import { wsUrl } from '@/constant/wsConfig';
import { CompanyModel } from '@/constant/company';

const IndexPage: React.FC<{}> = (props) => {
  const { suspend, globalDate } = useContext(context);
  const { TabPane } = Tabs;
  const [activityTabs, setActivityTabs] = useState('out');
  const activityTabsRef = useRef('out');

  const [bottomActivityTabs, setBottomActivityTabs] = useState('block');
  const bottomActivityTabsRef = useRef('block');

  const selectedRadioRef = useRef(0);
  const [selectedRadio, setSelectedRadio] = useState<number>(0);
  const periodType = useRef<string>('W');

  const [topDatas, setTopDatas] = useState<dataModel>();
  const [middleDatas, setMiddleDatas] = useState<any>();
  const [bottomDatas, setBottomDatas] = useState<any>();

  const [company, setCompany] = useState(CompanyModel.group);
  const companyRef = useRef(CompanyModel.group);
  const groupPeriodType = useRef<string>('D');
  const groupPeriodRef = useRef<string>();

  const areaColor = useRef<string[]>();

  // 切换日月年
  const tabRef: any = useRef('D');
  const [instDate, setInstDate] = useState('D'); // D/M/Y  日、月、年

  const didUnmount = useRef(false);
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(wsUrl, {
    shouldReconnect: (closeEvent) => {
      return didUnmount.current === false;
    },
    reconnectAttempts: 10,
    reconnectInterval: 3000,
  });

  useEffect(() => {
    return () => {
      didUnmount.current = true;
    };
  }, []);
  // 初始化获取值
  const getFundRunAllData = useCallback(() => {
    let msg = {
      msgType: 'getFundRunAllData',
      msgParam: {
        org: companyRef.current,
        tradeType: activityTabsRef.current,
        periodType: periodType.current,
        groupDataType: bottomActivityTabsRef.current,
        selDate: globalDate,
      },
    };
    sendJsonMessage(msg);
  }, [globalDate]);
  // 获取底部数据方法
  const getFundRunGroupData = useCallback(() => {
    let msg = {
      msgType: 'getFundRunGroupData',
      msgParam: {
        org: companyRef.current,
        tradeType: activityTabsRef.current,
        periodType: groupPeriodType.current,
        groupDataType: bottomActivityTabsRef.current,
        period: groupPeriodRef.current,
      },
    };
    sendJsonMessage(msg);
  }, []);

  /*  useEffect(() => {
    executionTimesFlag = 1
  }, []); */
  useEffect(() => {
    if (lastJsonMessage !== null) {
      if (lastJsonMessage.msgType === 'getFundRunAllData_Resp') {
        getPageData(lastJsonMessage?.data);
        groupPeriodRef.current = lastJsonMessage?.data.currentSubPeriod;
      } else if (lastJsonMessage.msgType === 'getFundRunGroupData_Resp') {
        getBottomChartDatas(lastJsonMessage?.data);
      }
    }
  }, [lastJsonMessage]);

  async function getPageData(fundRunAllData: Data) {
    const topDatasResult = await getTopChartData(fundRunAllData);
    const middleDatasResult = await getMiddleChartData(fundRunAllData, periodType.current);
    if (topDatasResult) {
      setTopDatas(topDatasResult);
    }
    if (middleDatasResult) {
      areaColor.current = middleDatasResult.areaColor;
      setMiddleDatas(middleDatasResult);
    }
    const bottomDatasResult = await getBottomDatas(fundRunAllData, periodType.current);
    if (bottomDatasResult) {
      setBottomDatas(bottomDatasResult);
    }
  }

  // 监听
  useEffect(() => {
    EventBus.on(EventBusKey.CurrentTimeKey, () => {
      getFundRunAllData();
    });
  }, []);
  useEffect(() => {
    EventBus.on(EventBusKey.IntervalRefreshKey, () => {
      if (activityTabsRef.current === 'out') {
        activityTabsRef.current = 'in';
      } else if (activityTabsRef.current === 'in') {
        activityTabsRef.current = 'total';
      } else {
        activityTabsRef.current = 'out';
      }
      setActivityTabs(activityTabsRef.current);
    });
    // 接收集团上市未上市
    EventBus.on(EventBusKey.CompanySelectKey, (value: CompanyModel) => {
      companyRef.current = value;
      setCompany(value);
    });
  }, []);

  useEffect(() => {
    getFundRunAllData();
  }, [activityTabs, selectedRadio, company]);

  // tab页点击事件
  async function callback(key: string) {
    setActivityTabs(key);
    activityTabsRef.current = key;
    suspend();
  }
  // tab页上按钮点击事件
  function clickRadioButton(index: number) {
    selectedRadioRef.current = index;
    let periodTypeTemp = { 0: 'W', 1: 'M', 2: 'Y' }[selectedRadioRef.current];
    periodType.current = periodTypeTemp!;

    let groupPeriodTypeTemp = { 0: 'D', 1: 'W', 2: 'M' }[selectedRadioRef.current];
    groupPeriodType.current = groupPeriodTypeTemp!;
    setSelectedRadio(index);
    suspend();
  }

  // 获取底部数据
  const getBottomChartDatas = async (fundRunGroupData: Data) => {
    const bottomDatasResult = await getBottomDatas(fundRunGroupData, periodType.current);
    if (bottomDatasResult) {
      setBottomDatas(bottomDatasResult);
    }
  };
  // 选中柱子，日期改变
  const barClick = (xAxisInfo: any) => {
    let date = xAxisInfo?.axisValue?.split(',')[1];
    let areaColorResult: any = [];
    for (const item of middleDatas.xData) {
      if (date === item[1]) {
        areaColorResult.push('rgba(255,255,255,0.1)');
      } else {
        areaColorResult.push('rgba(255,255,255,0)');
      }
    }
    groupPeriodRef.current = date;
    areaColor.current = areaColorResult;
    getFundRunGroupData();
    suspend();
  };

  // 底部Tab页change事件
  async function bottomCallback(key: string) {
    bottomActivityTabsRef.current = key;
    getFundRunGroupData();
    setBottomActivityTabs(key);
    suspend();
  }
  const getTabPane = () => {
    return (
      <>
        <TabPane tab="外部结算" key="out">
          <div className={styles.chart}>
            <div className={styles.topChart}>
              {/* {topDatas?.sjxjl && <TopChart data={topDatas.sjxjl} />} */}
              {topDatas?.sjlc && <TopChart data={topDatas.sjlc} />}
              {topDatas?.sjlr && <TopChart data={topDatas.sjlr} />}
            </div>
            <div className={styles.middleBarChart}>
              {middleDatas && (
                <MiddleBarChart onClick={barClick} areaColor={areaColor.current} middleDatas={middleDatas} />
              )}
            </div>
            <div className={styles.bottomChart}>
              <div className={styles.bottomBarChart}>
                <TabsComponent
                  activeKey={bottomActivityTabs}
                  getTabPane={getBottomTabPane}
                  callbackProps={bottomCallback}
                  borderTabs={true}
                  tabBarGutter={20}
                  defaultActiveKey={bottomActivityTabs}
                  unit={bottomDatas?.unitName || ''}
                />
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="内部结算" key="in">
          <div className={styles.chart}>
            <div className={styles.topChart}>
              <div className={styles.topChart}>
                {/* {topDatas?.sjxjl && <TopChart data={topDatas.sjxjl} />} */}
                {topDatas?.sjlc && <TopChart data={topDatas.sjlc} />}
                {topDatas?.sjlr && <TopChart data={topDatas.sjlr} />}
              </div>
            </div>
            <div className={styles.middleBarChart}>
              {middleDatas && (
                <MiddleBarChart onClick={barClick} areaColor={areaColor.current} middleDatas={middleDatas} />
              )}
            </div>
            <div className={styles.bottomChart}>
              <div className={styles.bottomBarChart}>
                <TabsComponent
                  activeKey={bottomActivityTabs}
                  getTabPane={getBottomTabPane}
                  callbackProps={bottomCallback}
                  borderTabs={true}
                  tabBarGutter={20}
                  defaultActiveKey={bottomActivityTabs}
                  unit={bottomDatas?.unitName || ''}
                />
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="资金合计" key="total">
          <div className={styles.chart}>
            <div className={styles.topChart}>
              <div className={styles.topChart}>
                {/* {topDatas?.sjxjl && <TopChart data={topDatas.sjxjl} />} */}
                {topDatas?.sjlc && <TopChart data={topDatas.sjlc} />}
                {topDatas?.sjlr && <TopChart data={topDatas.sjlr} />}
              </div>
            </div>
            <div className={styles.middleBarChart}>
              {middleDatas && (
                <MiddleBarChart onClick={barClick} areaColor={areaColor.current} middleDatas={middleDatas} />
              )}
            </div>
            <div className={styles.bottomChart}>
              <div className={styles.bottomBarChart}>
                <TabsComponent
                  activeKey={bottomActivityTabs}
                  getTabPane={getBottomTabPane}
                  callbackProps={bottomCallback}
                  borderTabs={true}
                  tabBarGutter={20}
                  defaultActiveKey={bottomActivityTabs}
                  unit={bottomDatas?.unitName || ''}
                />
              </div>
            </div>
          </div>
        </TabPane>
      </>
    );
  };

  // 底部tab页内容
  const getBottomTabPane = () => {
    return (
      <>
        <TabPane tab="业务板块" key="block">
          <div className={styles.chart}>
            {bottomDatas && (
              <>
                <div className={styles.leftRightChart}>
                  <CompareBar
                    yData={bottomDatas?.yDataLeft}
                    series={bottomDatas?.seriesLeft}
                    unitValue={bottomDatas?.unitValue}
                    unitName={bottomDatas?.unitName}
                  />
                </div>
                <div className={styles.middle} />
                <div className={styles.leftRightChart}>
                  <CompareBar
                    yData={bottomDatas?.yDataRight}
                    series={bottomDatas?.seriesRight}
                    unitValue={bottomDatas?.unitValue}
                    unitName={bottomDatas?.unitName}
                  />
                </div>
              </>
            )}
          </div>
        </TabPane>
        <TabPane tab="地区公司" key="region">
          <div className={styles.chart}>
            {bottomDatas && (
              <>
                <div className={styles.leftRightChart}>
                  <CompareBar
                    yData={bottomDatas?.yDataLeft}
                    series={bottomDatas?.seriesLeft}
                    unitValue={bottomDatas?.unitValue}
                    unitName={bottomDatas?.unitName}
                  />
                </div>
                <div className={styles.middle} />
                <div className={styles.leftRightChart}>
                  <CompareBar
                    yData={bottomDatas?.yDataRight}
                    series={bottomDatas?.seriesRight}
                    unitValue={bottomDatas?.unitValue}
                    unitName={bottomDatas?.unitName}
                  />
                </div>
              </>
            )}
          </div>
        </TabPane>
      </>
    );
  };
  const tabBarExtraContent = {
    right: (
      <RadioButtonGroup
        options={['周计划', '月计划', '年计划']}
        defaultSelected={0}
        onItemBtnClick={clickRadioButton}
      />
    ),
  };
  return (
    <div className={styles.fundOperation_Left_Content}>
      <div className={styles.header}>
        <span>资金运行</span>
        {/* <TabCard
          options={['当日', '本月', '本年累计']}
          defaultSelected={0}
          onItemBtnClick={(index) => {
            changeItemOption(index);
          }}
        /> */}
      </div>
      <div className={styles.tabs}>
        <TabsComponent
          activeKey={activityTabs}
          getTabPane={getTabPane}
          callbackProps={callback}
          borderTabs={false}
          tabBarGutter={66}
          defaultActiveKey={activityTabs}
          tabBarExtraContent={tabBarExtraContent}
        />
      </div>
    </div>
  );
};
export default IndexPage;
