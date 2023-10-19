<template>
	<el-container class="layout h-full">
		<el-aside class="bg-gray-200 !w-[200px]">
			<Sidebar />
		</el-aside>
		<el-main class="p-[10px]">
			<router-view />
		</el-main>
	</el-container>
</template>

<script>
import Sidebar from './Sidebar.vue'

export default {
	components: {
		Sidebar,
	},
}
</script>

<style></style>
