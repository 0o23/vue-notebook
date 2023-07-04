<!--
@author: 许俊杰
@desc: 可调节宽度的左右分栏
@date: 2023/07/04
-->
<template>
	<div class="adjustable-left-right-columns">
		<div class="container" id="adjustable-left-right-columns__container">
			<div class="left">
				<div class="resize"></div>
				<div class="bar-btn"></div>
				<div class="content">
					<slot name="left"> 这是左边的内容 </slot>
				</div>
			</div>

			<div class="right">
				<slot name="right"> 这是左边的内容 </slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'adjustableLeftRightColumns',

	mounted() {
		this.initResizeHeightAndMaxWidth()
	},

	methods: {
		initResizeHeightAndMaxWidth() {
			const containerDOM = document.getElementById('adjustable-left-right-columns__container')
			const resizeDOM = document.getElementsByClassName('resize')[0]

			resizeDOM.style.height = containerDOM.offsetHeight + 'px'
			resizeDOM.style.maxWidth = Math.floor(containerDOM.offsetWidth * 0.5) + 'px'
		},
	},
}
</script>

<style lang="scss" scoped>
.adjustable-left-right-columns {
	height: 100%;

	.container {
		display: flex;
		height: 100%;
	}

	.left {
		position: relative;
	}

	.left .resize {
		min-width: 100px;
		width: 300px;
		resize: horizontal;
		overflow: scroll;
		height: inherit;
		opacity: 0;
	}

	.resize::-webkit-scrollbar {
		width: 8px;
		height: inherit;
	}
	.resize:hover ~ .bar-btn,
	.resize:active ~ .bar-btn {
		border-left: 2px dashed skyblue;
	}

	.left .bar-btn {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		border-right: 2px solid #eee;
		border-left: 1px solid #bbb;
		pointer-events: none;
	}

	.content {
		position: absolute;
		top: 0;
		z-index: 0;
		overflow-x: hidden;
		height: 100%;
		width: calc(100% - 5px);
	}

	.right {
		width: 200px;
		flex: 1;
		height: 200px;
	}
}
</style>
