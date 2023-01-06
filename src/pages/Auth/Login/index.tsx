/*
 * @Author: ZY
 * @Date: 2022-01-14 10:19:48
 * @LastEditors: Deshun
 * @LastEditTime: 2023-01-06 09:28:36
 * @FilePath: \big-screen-template\src\pages\Auth\Login\index.tsx
 * @Description: 文件描述
 */

import React from 'react';
import { history } from 'umi';
import { Button, Form, Input, message } from 'antd';
import './index.less';

const IndexPage: React.FC<{}> = (props) => {
  const onFinish = (values: any) => {
    const { password, username } = values;
    if (username !== '123' || password !== '456') {
      message.error({
        content: '验证失败!',
      });
      localStorage.removeItem('logged');
    } else {
      localStorage.removeItem('logged');
      sessionStorage.setItem('logged', 'true');
      history.push('/dashboard');
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-top-content">
          <span className="login-left-picture" />
          <span className="login-center-picture" />
          <span className="login-right-picture" />
        </div>
        <div className="login-all-form">
          <div className="login-slogan">欢迎登录</div>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="login-form-item"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入账号!',
                },
              ]}
            >
              <Input placeholder="请输入账号" prefix={<div className="user" />} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码!',
                },
              ]}
            >
              <Input type="password" placeholder="请输入密码" prefix={<div className="password" />} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
          <div />
        </div>
      </div>
    </div>
  );
};
export default IndexPage;
