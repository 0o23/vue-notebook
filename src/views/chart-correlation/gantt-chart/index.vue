<!--
@author: 许俊杰
@desc: 甘特图
@date: 2023/08/04
-->
<template>
	<div class="w-full h-[500px]" ref="ganttRef"></div>
</template>

<script>
import * as echarts from 'echarts'
import ganttData from './mock'
import getGanttOptions from './config-gantt'

export default {
	name: 'GanttChart',

	data() {
		return {
			ganttInstance: null,
		}
	},

	mounted() {
		this.init()
	},

	methods: {
		init() {
			const chartDom = this.$refs.ganttRef
			this.ganttInstance = echarts.init(chartDom)

			const options = getGanttOptions({
				...ganttData,
				zoomTop: 480,
			})
			this.ganttInstance.setOption(options)
		},
	},
}
</script>

<style lang="scss" scope></style>
