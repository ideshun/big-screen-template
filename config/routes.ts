/*
 * @Author: ZY
 * @Date: 2021-08-02 13:54:53
 * @LastEditors: Deshun
 * @LastEditTime: 2023-01-05 10:30:41
 * @FilePath: \big-screen-template\config\routes.ts
 * @Description: 路由配置
 */
export default [
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      { path: '/', redirect: '/dashboard' },
      {
        path: '/auth',
        name: '登陆',
        component: '@/pages/Auth/Login',
      },
      {
        path: '/dashboard',
        name: '首页',
        component: '@/pages/Dashboard',
      },
    ],
  },
];
