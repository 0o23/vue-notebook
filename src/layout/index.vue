<template>
	<el-container class="layout h-full">
		<el-aside class="bg-gray-200 !w-[200px]">
			<Sidebar />
		</el-aside>
		<el-main class="p-[10px]">
			<component :is="activatedChildComponent"></component>
		</el-main>
	</el-container>
</template>

<script>
import Sidebar from './Sidebar.vue'
import Codemirror from '@/views/Codemirror.vue'

export default {
	components: {
		Sidebar,
		Codemirror,
	},

	data() {
		return {
			activatedChildComponent: 'Codemirror',
		}
	},
}
</script>

<style></style>
