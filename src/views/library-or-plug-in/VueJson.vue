<!--
@author: 许俊杰
@desc: 
@date: 
-->
<template>
	<div class="">
		<VueJsonPretty />
		<VJsoneditor />
	</div>
</template>

<script>
import VueJsonPretty from '@/components/VueJsonPretty'
import VJsoneditor from '@/components/VJsoneditor.vue'

export default {
	name: '',

	components: {
		VueJsonPretty,
		VJsoneditor,
	},

	data() {
		return {}
	},

	methods: {},
}
</script>

<style lang="scss" scope></style>
