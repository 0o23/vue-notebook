<template>
	<div class="sidebar">
		<el-menu
			router
			class="el-menu-vertical-demo"
			:default-active="defaultActiveMenu"
			:default-openeds="defaultOpenedMenuList"
		>
			<el-submenu v-for="{ index, icon, label, items } in menuList" :key="index" :index="index">
				<template slot="title">
					<i :class="icon"></i>
					<span>{{ label }}</span>
				</template>
				<el-menu-item v-for="item in items" :key="item.index" class="bg-gray" :index="item.index">
					{{ item.label }}
				</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
export default {
	name: 'Sidebar',

	data() {
		return {
			defaultActiveMenu: '',

			menuList: [
				{
					index: '1',
					icon: 'el-icon-s-grid',
					label: '库或插件',
					items: [
						{
							index: 'codemirror',
							label: 'codemirror',
							componentName: 'Codemirror',
						},
						{
							index: 'vue-json',
							label: 'VueJson',
							componentName: 'VueJson',
						},
					],
				},
				{
					index: '2',
					icon: 'el-icon-pie-chart',
					label: '图表相关',
					items: [],
				},
				{
					index: '3',
					icon: 'el-icon-star-off',
					label: 'CSS相关',
					items: [
						{
							index: 'column-width-stretching',
							label: '分栏宽度拉伸',
							componentName: 'ColumnWidthStretchingVue',
						},
					],
				},
				{
					index: '4',
					icon: 'el-icon-star-off',
					label: '其他',
					items: [
						{
							index: 'large-file-upload',
							label: '大文件上传',
							componentName: 'LargeFileUpload',
						},
						// {
						// 	index: '混入React',
						// 	label: '混入React',
						// 	componentName: 'MixinReact',
						// },
						{
							index: 'file-upload-table',
							label: '文件上传表格',
							componentName: 'fileUploadTable',
						},
					],
				},
			],
		}
	},

	computed: {
		// 默认展开全部的一级菜单
		defaultOpenedMenuList() {
			return this.menuList.map(menu => menu.index)
		},
	},

	watch: {
		$route: {
			handler(newVal) {
				const val = newVal.path.substring(1)
				this.defaultActiveMenu = val
			},
			deep: true,
			immediate: true,
		},
	},
}
</script>
