# 使用 vuera 在 Vue 项目中使用 React 组件

#### step1. npm 下载如下依赖

vuera@0.2.7
react@16.14.0
react-dom@16.14.0
@babel/preset-react@7.22.5
@babel/plugin-transform-runtime@7.22.9
@babel/plugin-transform-react-jsx@7.22.5
注: 如果是使用 antv/ava, 则需要额外下载:
@antv/ava@3.0.6
@antv/ava-react@3.1.7
@ant-design/icons@5.2.4
antd@4.16.13

#### step2. vue.config.js 文件加入如下代码

```javascript
module.exports = {
	// ...
	configureWebpack: {
		module: {
			rules: [
				{
					test: /\.(tsx?|jsx?)$/i,
					exclude: /(node_modules|bower_components)/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-react'],
								plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-transform-react-jsx'],
							},
						},
					],
				},
			],
		},
	},
}
```

#### step3. babel.config.js 文件加入如下代码

```javascript
module.exports = {
	// ...
	plugins: ['@babel/plugin-transform-react-jsx', '@babel/plugin-transform-runtime'],
}
```

#### step4. 截止目前, 所需配置已完成, 使用方式如下

- 1. 新建 React 组件(js 文件), 并在其中写入 React 代码;
- 2. 在 Vue 组件中导入并注册 React 的 js 文件:

```vue
<script>
// ...
import { ReactInVue } from 'vuera' // 导入 vuera
import ReactComponent from './ReactComponent' // 导入 React 组件

export default {
	// ...
	components: {
		ReactComponent: ReactInVue(ReactComponent), // 转换并注册 React 组件为 Vue 组件
	},
}
</script>
```

- 3. 注册完毕后按照正常 Vue 组件使用即可

```vue
<template>
	<div>
		<ReactComponent />
	</div>
</template>
```

#### 附:

- React 组件内使用 antv/ava 时可能遇到无法显示图表的问题:

  假设已有名为 MixinReact 的 Vue 组件, 该组件内导入了 React 组件.
  但在使用 MixinReact 组件时却无法显示图表:

  ```vue
  <MixinReact />
  ```

  此时可以用这种写法:

  ```vue
  <component :is="'MixinReact'">
  ```
