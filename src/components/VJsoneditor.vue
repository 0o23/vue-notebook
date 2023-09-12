<!--
@author: 许俊杰
@desc: 
@date: 
-->
<template>
	<div class="">
		<a href="https://github.com/yansenlei/VJsoneditor" target="_blank">VJsoneditor@1.4.5</a>
		<VJsoneditor v-model="json" :options="options" :plus="false" height="400px" @error="onError" />
	</div>
</template>

<script>
import VJsoneditor from 'v-jsoneditor'

export default {
	name: 'app',

	components: {
		VJsoneditor,
	},

	data() {
		return {
			options: {
				mode: 'code',
			},
			json: {
				hello: 'vue',
			},
		}
	},

	methods: {
		onError() {
			console.log('error')
		},
	},
}
</script>

<style lang="scss" scope>
a {
	color: #409eff !important;
	text-decoration: underline !important;
}
</style>
