/**
 * 代码参考来源: https://madeapie.com/#/chartInfo/xGeNfEsuhT
 */

import * as echarts from 'echarts'
import moment from 'moment'

let today = new Date()
today.setHours(0, 0, 0, 0)
let startday = today.getTime()

today.setHours(24, 0, 0, 0)

function renderItem(params, api) {
	var categoryIndex = api.value(0)
	var start = api.coord([api.value(1), categoryIndex])
	var end = api.coord([api.value(2), categoryIndex])
	// var height = api.size([0, 1])[1] * 0.6
	var height = api.size([0, 1])[1] * 0.25

	var rectShape = echarts.graphic.clipRectByRect(
		{
			x: start[0],
			y: start[1] - height / 2,
			width: end[0] - start[0],
			height: height,
		},
		{
			x: params.coordSys.x,
			y: params.coordSys.y,
			width: params.coordSys.width,
			height: params.coordSys.height,
		},
	)

	return (
		rectShape && {
			type: 'rect',
			shape: rectShape,
			style: api.style(),
		}
	)
}

/**
 * @func 将秒数转为x时x分x秒的格式
 * @desc input: 3665   output: "1时1分5秒"
 * @param {String | Number} secondsStr
 * @return {String} timeString 转换后的字符串
 */
function getFormattingTime(secondsStr) {
	const seconds = parseInt(secondsStr)
	const hours = Math.floor(seconds / 3600)
	const minutes = Math.floor((seconds % 3600) / 60)
	const remainingSeconds = seconds % 60

	let timeString = ''
	if (hours > 0) timeString += hours + '时'
	if (minutes > 0 || hours > 0) timeString += minutes + '分'
	timeString += remainingSeconds + '秒'

	return timeString
}

export default function ({ xList, yList, zoomTop = 220 }) {
	return {
		tooltip: {
			formatter: function (params) {
				const yIndex = params.value[0]
				const yValue = yList[yIndex]
				let start = moment(xList[params.dataIndex].value[1]).format('YYYY-MM-DD HH:mm:ss')
				let end = moment(xList[params.dataIndex].value[2]).format('YYYY-MM-DD HH:mm:ss')
				return (
					params.marker +
					yValue +
					'</br>' +
					'运行开始时间: ' +
					start +
					'</br>' +
					'运行结束时间: ' +
					end +
					'</br>' +
					params.name +
					': ' +
					getFormattingTime(params.value[3] / 1000) +
					'</br>'
				)
			},
		},
		dataZoom: [
			{
				type: 'slider',
				filterMode: 'weakFilter',
				showDataShadow: false,
				top: zoomTop, // 缩放条与 DOM 顶部的距离, 需要动态设置
				height: 2,
				borderColor: 'transparent',
				backgroundColor: '#e2e2e2',
				handleIcon:
					'path://M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
				handleSize: 20,
				handleStyle: {
					shadowBlur: 6,
					shadowOffsetX: 1,
					shadowOffsetY: 2,
					shadowColor: '#aaa',
				},
				labelFormatter: '',
			},
			{
				type: 'inside',
				filterMode: 'weakFilter',
			},
		],
		grid: {
			top: 0,
			left: 70,
			right: 40,
			bottom: 20,
			// height: 200,
			// containLabel: true
		},
		xAxis: {
			min: startday,
			// max: endday,
			type: 'time',
			scale: true,
			interval: 3600 * 1000 * 2,
			axisLabel: {
				show: true,
				formatter: function (val, val1) {
					// console.log(moment(Number(val)).format('YYYY-MM-DD HH:mm'));
					return moment(Number(val)).format('HH:mm')
					// return Math.max(0, val - startTime) + ' ms'
				},
			},
		},
		yAxis: {
			data: yList,
			axisLabel: {
				show: true,
				interval: 0,
				formatter: function (value, index) {
					var last = ''
					var max = 4
					var len = value.length
					var hang = Math.ceil(len / max)
					if (hang > 1) {
						for (var i = 0; i < hang; i++) {
							var start = i * max
							var end = start + max
							var temp = value.substring(start, end) + '\n'
							last += temp //凭借最终的字符串
						}
						return last
					} else {
						return value
					}
				},
			},
		},
		series: [
			{
				type: 'custom',
				renderItem: renderItem,
				itemStyle: {
					opacity: 0.8,
				},
				encode: {
					x: [1, 2],
					y: 0,
				},
				data: xList,
			},
		],
	}
}
