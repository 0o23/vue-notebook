<template>
	<div class="column-width-stretching h-full">
		<div class="resize-container" ref="resizeContainerRef">
			<div class="resize-container-left" ref="resizeContainerLeftRef">
				<div class="resize-bar"></div>
				<div class="resize-line"></div>
				<div class="resize-save">左左左左左左左</div>
			</div>
			<div class="resize-container-right" style="position: relative">右右右右右右右</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ColumnWidthStretching',

	mounted() {
		this.initResizeBarHeight()
	},

	methods: {
		initResizeBarHeight() {
			const HEIGHT = this.$refs.resizeContainerRef.offsetHeight
			this.$refs.resizeContainerLeftRef.style.height = HEIGHT + 'px'
		},
	},
}
</script>

<style>
@import './styles/resize.scss';
</style>
