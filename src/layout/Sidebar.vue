<!--
@author: 许俊杰
@desc: 
@date: 
-->
<template>
	<div class="sidebar">
		<el-menu default-active="2" class="el-menu-vertical-demo" :default-openeds="openedMenus">
			<el-submenu index="1">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span>库或插件</span>
				</template>
				<el-menu-item class="bg-gray" index="1-2">codemirror</el-menu-item>
			</el-submenu>
			<el-submenu index="2">
				<template slot="title">
					<i class="el-icon-menu"></i>
					<span slot="title">图表相关</span>
				</template>

				<el-menu-item index="1-1">jsplumb</el-menu-item>
				<el-menu-item index="1-2">go.js</el-menu-item>
				<el-menu-item index="1-3">g6</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
export default {
	name: 'Sidebar',

	data() {
		return {
			openedMenus: ['1', '2'],
		}
	},

	methods: {},
}
</script>
