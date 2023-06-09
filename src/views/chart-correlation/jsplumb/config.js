// 线和点的样式
export const lineAndPointConfig = {
	ConnectionsDetachable: true, // 是否可以拖动端点取消连接
	// 连接线的样式
	PaintStyle: {
		outlineStroke: '#5C96BC', // 线的颜色
		strokeWidth: 0.3, // 线的粗细
	},

	// 连接线 hover 时的样式
	HoverPaintStyle: {
		outlineStroke: '#1E8151', // 线的颜色
		strokeWidth: 0.5, // 线的粗细
	},

	// 点的样式
	EndpointStyle: {
		fill: '#445566', // 点的填充颜色
		outlineStroke: '#445566', // 点的边线颜色
		radius: 3, // 点的大小
	},
}
