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
			defaultOpenedMenuList: ['1', '2', '3'],

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
						},
						{
							index: 'go.js',
							label: 'go.js',
						},
						{
							index: 'g6',
							label: 'g6',
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
			],
		}
	},

	computed: {
		defaultActiveMenu: {
			set() {},
			get() {
				return this.menuList[0].items[0].index
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
