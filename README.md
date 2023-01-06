# 大屏项目模板 @Umi3


> 大屏项目模板，基于 umi，ts 和 ant-design-pro，以 react hooks 风格编写。


## 基础环境和工具

- vscode
- yarn
- node
- ts
- umi
- react/react-hooks


## 多环境配置

```
├─ /config/config.prod.ts       # 生产环境配置
├─ /config/config.test.ts       # 测试环境配置
├─ /config/config.ts      		  # 开发环境和整体配置
```

对应命令：

```shell
  "start": "cross-env umi dev",
  "build:prod": "cross-env UMI_ENV=prod umi build",
```

## 登陆页面

自动跳转登录页 `@/src/app.ts 13`

如不需要登录页，在 `/config/routes.ts`、`@/src/pages/Auth`、`@/src/app.ts 13` 删除相关配置和文件。

## 目录结构

```
big-screen-template
├── config                             # 项目配置
|  ├── config.prod.ts                  # 生产环境配置
|  ├── config.test.ts                  # 测试环境配置
|  ├── config.ts                       # 开发环境和整体配置
|  └── routes.ts                       # 路由配置
├── mock                               # Mock模拟数据
├── nginx                              # Nginx配置
|  └── default.conf
├── node_modules                       # 依赖
├── public                             # 静态文件
|  └── logo.svg
├── scripts                            # 预执行脚本
|  └── rem.js
├── src
|  ├── app.ts
|  ├── asset                           # 资源文件夹
|  |  ├── body_bg.png
|  |  ├── font                         # 字体文件夹
|  |  ├── iconfont                     # 阿里字体库
|  |  ├── pause.png
|  |  └── play.png
|  ├── components                      # 全局组件文件夹
|  |  ├── compare-bar
|  |  ├── radio-button-group
|  |  └── tabs
|  ├── constant                        # 项目常量
|  |  ├── company.ts
|  |  ├── context.ts
|  |  ├── date.ts
|  |  ├── eventBusKey.ts
|  |  ├── index.ts
|  |  ├── unit.ts
|  |  └── wsConfig.ts
|  ├── global.less                     # 全局样式
|  ├── layouts                         # 项目整体布局
|  |  └── index.tsx
|  ├── pages                           # 页面
|  |  ├── Auth                         # 模块
|  |  |  └── index.tsx                 # 模块入口
|  |  └── Dashboard
|  ├── services                        # 服务相关
|  |  ├── config.ts                    # 配置相关
|  |  ├── model                        # Model数据接口等
|  |  └── org.ts
|  ├── settings                        # 项目配置类
|  |  ├── defaultChartsOptions.ts
|  |  ├── defaultConfig.ts
|  |  └── remoteConfig.ts
|  ├── types                           # 数据模型
|  |  ├── reqInput.ts
|  |  ├── reqResult.ts
|  |  └── tableInput.ts
|  └── utils                           # 工具类
|     ├── eventBus.ts
|     ├── network                      # 网络请求相关
|     ├── number.ts                    # 数值工具类
|     ├── orgManager.ts                #组织机构管理单例
|     ├── period.ts                    # 期间工具类
|     └── viewFormat.ts                # 页面格式化工具类
├── commitlint.config.js               # commitlint配置
├── README.md                          # 描述文件
├── package.json                       # 包管理工具
├── tsconfig.json
└── typings.d.ts

```

## 起步

进入项目目录，执行

```
yarn / npm i   // 安装依赖
yarn start							 // 运行
```

端口重复，启动时候会自动分配，查看终端运行起来显示即可。

如需指定端口：

前往 `/config/config.ts`文件

```json
 devServer:{
    port:8888   //更改端口号即可
 },
```

## 规则

默认使用 TS 和 TSX 文件编写代码，因为需要格式检查，避免出现错误自己不知道。（特殊情况可以例外）

### 命名规范



- 普通文件夹命名： 小写，多个单词以 - 分割

  ```
  good:
  components   ✅
  react-native   ✅
  
  
  bad:
  Components    ❌
  ```

-  组件文件夹命名：

 ```
  good:
  TitleCard     ✅
  
  bad:
  title-card    ❌
  title_card    ❌
  titleCard     ❌

 ```

-  组件文件命名：

 如果文件夹下只有一个组件文件，推荐index.ts 命名。

 否则大驼峰命名多个文件

![clipboard.png](https://segmentfault.com/img/bVbsrDI?w=400&h=479)


- 类名: 大驼峰

```
good:
TitleCard 	     ✅

bad:
titleCard.ts     ❌
title_card.ts    ❌

```

命名使用英文单词表述，最好能做到见名知其意。为了增加可读性，可以 e,m,o 尽量少用，除非一眼就可以看出来变量意思。

- 魔法数问题

  ```js
  bad:
  
  if(x === 0000100001){
  	consle.log('本月')
  }
  ```


  good:

  /**

   * @description: 期间值数据类型--标识
   * BY:本年
   * BM：本月
   * BD：本天
   * BQ: 本季
   * BW: 本周
   * BHY: 本半年
     */
       export enum DPeriodsDateType {
     BY = '0000100001',
     BM = '0000100007',
     BD = '0000100013',
     BQ = '0000100019',
     BW = '0000100031',
     BHY = '0000100047',
       }

  if (x = DPeriodsDateType.BY){
    	consle.log('本月')
  }

  ```
### .prettier

prettier 是强制风格型，保持代码风格统一，umi 默认也是使用这个。

vscode 安装 prettier 插件,保存的时候格式化一下或者手动格式化。

项目配置：

```json

{
  "singleQuote": true,           # 单引号
  "trailingComma": "all",				 # 行尾逗号,默认none,可选 none|es5|all
  "printWidth": 80,							 # 每行最多多少个字符换行
  "overrides": [
    {
      "files": ".prettierrc",
      "options": { "parser": "json" }
    }
  ]
}

  ```

也可以使用命令整体自动格式化：

```shell
    "prettier": "prettier --write '**/*.{js,jsx,tsx,ts,md,json}'",
```

代码提交检查重写（目前 umi3 bug 等待回复）：

```json
"gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "*.{js,jsx,less,md,json}": [
      "prettier --write"
    ],
    "*.ts?(x)": [
      "prettier --parser=typescript --write"
    ]
  },
```



## 代码分支结构

使用 gitflow 工作流程

- master:主分支对应生产环境

- test: 预发布分支对应测试环境 ,从 master 拉出合并到 master

- dev: 开发分支,从 test 拉出，合并到 test

- hotfix: 线上 bug 修复分支,修复完之后合并到 master

- feature/功能名称 : 个人开发功能的分支，从 dev 拉出来合并到 dev



## 浏览器支持

{ chrome: 49, firefox: 64, safari: 10, edge: 13, ios: 10 }