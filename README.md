react-ts-webpack-template
├── pnpm-lock # 锁定 npm 包依赖版本文件
├── package.json
├── public # 存放 html 模板
├── README.md
├── config # webpack 项目配置文件
├── src
│ ├── assets # 存放会被 Webpack 处理的静态资源文件：一般是自己写的 js、css 或者图片等静态资源
│ │ ├── fonts # iconfont 目录
│ │ ├── images # 图片资源目录
│ │ ├── css # 全局样式目录
│ │ └── js # 全局 js
│ ├── common # 存放项目通用文件
│ ├── components # 项目中通用的业务组件目录
│ ├── pages # 项目页面目录
    ├── Welcome // 路由组件下不应该再包含其他路由组件，基于这个约定就能清楚的区分路由组件和非路由组件了
|      ├── components // 对于复杂的页面可以再自己做更深层次的组织，但建议不要超过三层
|      ├── Form.tsx
|      ├── index.tsx // 页面组件的代码
|      └── index.less // 页面样式
│ ├── types # 项目中声明文件
│ ├── routes # 路由目录
│ ├── services # 和后端相关的文件目录
│ ├── store # 仓库
│ ├── utils # 全局通用工具函数目录
│ ├── App.tsx # App 全局
│ ├── index.tsx # 项目入口文件
│ ├── index.less # 项目入口引入的 less
└── tsconfig.json # TS 配置文件
└── typing.d.ts # TS 项目中忽略 ts 检查文件目录
└── typing.d.ts # TS 项目中忽略 ts 检查文件目录
