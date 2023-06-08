<template>
	<div class="codemirror h-full">
		<div class="h-[30px] relative">
			<div class="absolute bottom-[5px] z-[-1] bg-orange-300 h-[5px] w-10"></div>
			<div class="text-[20px]">Tips:</div>
		</div>
		<div class="pl-[10px] text-[14px]">
			- 支持关键字提示(SELECT、FROM、ORDER 等)，可按下回车键(Enter)进行自动补全；
		</div>
		<div class="pl-[10px] text-[14px] mb-[10px]">
			- 支持自定义提示(custom_table / custom_field1 / custom_field2 / custom_field3)
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
}
</script>
