<template>
	<el-container class="layout h-full">
		<el-aside class="bg-gray-200 !w-[200px]">
			<Sidebar @change-component="changeComponent" />
		</el-aside>
		<el-main class="p-[10px]">
			<component :is="activatedChildComponent"></component>
		</el-main>
	</el-container>
</template>

<script>
import Sidebar from './Sidebar.vue'
import Codemirror from '@/views/Codemirror.vue'
import ColumnWidthStretchingVue from '@/views/css-correlation/column-width-stretching'
import JsPlumb from '@/views/chart-correlation/jsplumb/'

export default {
	components: {
		Sidebar,
		Codemirror,
		ColumnWidthStretchingVue,
		JsPlumb,
	},

	data() {
		return {
			activatedChildComponent: 'JsPlumb',
		}
	},

	methods: {
		changeComponent(componentName) {
			this.activatedChildComponent = componentName
		},
	},
}
</script>

<style></style>
