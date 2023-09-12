<template>
	<div class="sidebar">
		<el-menu
			class="el-menu-vertical-demo"
			:default-active="defaultActiveMenu"
			:default-openeds="defaultOpenedMenuList"
			@select="selectMenu"
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
							index: 'VueJson',
							label: 'VueJson',
							componentName: 'VueJson',
						},
					],
				},
				{
					index: '2',
					icon: 'el-icon-pie-chart',
					label: '图表相关',
					items: [
						{
							index: 'jsplumb',
							label: 'jsplumb',
							componentName: 'JsPlumb',
						},
						{
							index: 'g6',
							label: 'g6',
						},
						{
							index: '甘特图',
							label: '甘特图',
							componentName: 'GanttChart',
						},
					],
				},
				{
					index: '3',
					icon: 'el-icon-star-off',
					label: 'CSS相关',
					items: [
						{
							index: '分栏宽度拉伸',
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
							index: '智能助手',
							label: '智能助手',
							componentName: '',
						},
						{
							index: '高级过滤',
							label: '高级过滤',
							componentName: '',
						},
						{
							index: '大文件上传',
							label: '大文件上传',
							componentName: 'LargeFileUpload',
						},
						// {
						// 	index: '混入React',
						// 	label: '混入React',
						// 	componentName: 'MixinReact',
						// },
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

		defaultActiveMenu: {
			set() {},
			get() {
				// return this.menuList[0].items[0].index
				return 'VueJson'
			},
		},

		// 二级菜单列表
		menuItemList() {
			return this.menuList
				.map(submenu => {
					return [...submenu.items]
				})
				.flat(1)
		},
	},

	methods: {
		selectMenu(menuIndex) {
			const targetComponent = this.menuItemList.find(i => i.index === menuIndex).componentName
			this.$emit('change-component', targetComponent)
		},
	},
}
</script>
