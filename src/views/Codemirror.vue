<template>
	<div class="codemirror h-full">
		<div>支持关键字提示(SELECT、FROM、ORDER 等)</div>
		<div class="mb-[10px]">
			支持自定义提示(custom_table / custom_field1 / custom_field2 / custom_field3)
		</div>

		<SqlEditor />
	</div>
</template>

<script>
export default {
	name: 'Codemirror',

	components: {
		SqlEditor: () => import('@/components/SqlEditor.vue'),
	},

	data() {
		return {}
	},

	methods: {},
}
</script>

<style lang="scss" scope></style>
