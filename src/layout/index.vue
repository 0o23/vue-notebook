<template>
	<el-container class="layout h-full">
		<el-aside width="200px" class="bg-gray-200">
			<Sidebar />
		</el-aside>
		<el-main class="p-2">Main</el-main>
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
