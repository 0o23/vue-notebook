<!--
@author: 许俊杰
@desc: 其他-vu中混入并渲染react文件
@date: 
-->
<template>
	<div class="mixin-react">
		混入React

		<ReactComponent />
	</div>
</template>

<script>
import { ReactInVue } from 'vuera'
import ReactComponent from './ReactComponent'

export default {
	name: 'MixinReact',

	components: {
		ReactComponent: ReactInVue(ReactComponent),
	},

	data() {
		return {
			message: 'hello world',

			avaData: {},
		}
	},

	methods: {},
}
</script>

<style lang="scss" scope></style>
