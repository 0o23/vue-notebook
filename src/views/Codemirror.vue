<template>
	<div class="codemirror h-full">
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
