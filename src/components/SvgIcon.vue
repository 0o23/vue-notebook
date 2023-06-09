<!--
@author: 许俊杰
@desc: svg图标
@date: 2023/06/09
-->
<template>
	<svg class="icon" aria-hidden="true">
		<use :xlink:href="`#${className}`"></use>
	</svg>
</template>

<script>
export default {
	name: 'SvgIcon',

	props: {
		className: {
			require: true,
			type: String,
		},
	},
}
</script>
