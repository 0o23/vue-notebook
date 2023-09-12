<template>
	<div>
		<a href="https://github.com/leezng/vue-json-pretty" target="_blank">VueJsonPretty@1.9.4</a>
		<VueJsonPretty :data="obj" showLineNumber showIcon editable />
	</div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

export default {
	components: {
		VueJsonPretty,
	},

	data() {
		return {
			obj: {
				code: 200,
				success: true,
				message: 'chenggong',
				data: [
					{
						name: 'zs',
						age: 20,
					},
					{
						name: 'ls',
						age: 18,
					},
				],
			},
		}
	},
}
</script>

<style scoped>
a {
	color: #409eff;
	text-decoration: underline;
}
</style>
