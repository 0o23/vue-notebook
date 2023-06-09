<!--
@author: 许俊杰
@desc: 图表相关-jsplumb
@date: 2023/06/09
-->
<template>
	<div class="js-plumb h-full">
		<ColumnWidthStretching>
			<template slot="left">
				<el-tree default-expand-all :data="treeData" class="w-full">
					<span slot-scope="{ node, data }" class="flex items-center text-[14px]">
						<SvgIcon :class-name="treeImgMap[data.type]" class="mr-[5px]" />
						{{ node.label }}
					</span>
				</el-tree>
			</template>

			<template slot="right">
				<div :id="CONTAINER_ELEMENT_ID" class="h-full"></div>
			</template>
		</ColumnWidthStretching>
	</div>
</template>

<script>
import ColumnWidthStretching from '../../css-correlation/column-width-stretching'
import { jsPlumb } from 'jsplumb'
import { lineAndPointConfig } from './config'

export default {
	name: 'JsPlumb',

	components: {
		ColumnWidthStretching,
	},

	data() {
		return {
			CONTAINER_ELEMENT_ID: 'diagramContainer', // 容器元素的 id 属性值

			treeData: [
				{
					label: '文件夹1',
					type: 'folder',
					children: [
						{
							label: '表1',
							type: 'table',
							children: [
								{ label: '这是一个不长的字段', type: 'field' },
								{ label: '这是一个有点长长长的字段', type: 'field' },
								{ label: '这是一个很长长长长长长长长长长长长长的字段', type: 'field' },
								{ label: '平平无奇的字段', type: 'field' },
							],
						},
					],
				},
				{
					label: '文件夹2',
					type: 'folder',
					children: [
						{
							label: '表2',
							type: 'table',
							children: [
								{ label: '字段1', type: 'field' },
								{ label: '字段2', type: 'field' },
								{ label: '字段3', type: 'field' },
							],
						},
					],
				},
				{
					label: '文件夹3',
					type: 'folder',
					children: [
						{
							label: '表3',
							type: 'table',
							children: [
								{ label: '字段1', type: 'field' },
								{ label: '字段2', type: 'field' },
								{ label: '字段3', type: 'field' },
							],
						},
						{
							label: '表4',
							type: 'table',
							children: [{ label: '字段1', type: 'field' }],
						},
					],
				},
			],

			treeImgMap: {
				folder: 'icon-wenjianjia',
				table: 'icon-biaoge',
				field: 'icon-ziduanguanli',
			},
		}
	},

	mounted() {
		this.initJsPlumb()
	},

	methods: {
		initJsPlumb() {
			jsPlumb.ready(() => {
				// 设置容器
				jsPlumb.setContainer(this.CONTAINER_ELEMENT_ID)

				// 配置 jsPlumb 的部分样式
				jsPlumb.importDefaults(lineAndPointConfig)

				// 设置线的点击事件
				jsPlumb.bind('click', (conn, originalEvent) => this.lineClick(conn, originalEvent))

				// 设置连线之前的事件
				jsPlumb.bind('beforeDrop', (conn, originalEvent) => this.beforeLineDrop(conn))

				// 设置节点连接时的事件
				jsPlumb.bind('connection', (conn, originalEvent) => this.nodeConnection(conn))
			})
		},

		lineClick(conn, originalEvent) {
			this.originalEvent = originalEvent

			let srcUrl = originalEvent.srcElement.getAttribute('src')
			let arr = ['innerJoin', 'leftJoin', 'rightJoin', 'fullJoin', 'crossJoin']

			let joinType = ''
			if (srcUrl.indexOf('innerJoin') !== -1) {
				joinType = '内连接'
			} else if (srcUrl.indexOf('leftJoin') !== -1) {
				joinType = '左连接'
			} else if (srcUrl.indexOf('rightJoin') !== -1) {
				joinType = '右连接'
			} else if (srcUrl.indexOf('fullJoin') !== -1) {
				joinType = '全连接'
			} else if (srcUrl.indexOf('crossJoin') !== -1) {
				joinType = '联合'
			}

			// 如果当前点击的是连接类图标，则 isJoin 值为 true，否则为 false
			let isJoin = arr.filter(item => srcUrl.indexOf(item) !== -1).length > 0 ? true : false

			// 如果当前点击的是删除图标，则 isRemove 值为 true，否则为 false
			let isRemove = originalEvent.srcElement.getAttribute('src').indexOf('remove') !== -1

			if (isJoin) {
				this.selectJoin = joinType
				this.showJoinDialog = true
			} else if (isRemove) {
				jsPlumb.deleteConnection(conn)
			}
		},

		// 比较连接的出发节点和连接的目的节点的父元素，如果相同，则取消本次连接
		beforeLineDrop(conn) {
			return !(conn.connection.source.parentElement === conn.connection.target.parentElement)
		},

		nodeConnection(conn) {
			// 回显时，创建连接，会触发到这个绑定的连接函数，在这里给连接线加图标
			var img = null
			switch (this.echoJoinType) {
				case 'inner join':
					img = innerJoin_png
					break
				case 'left join':
					img = leftJoin_png
					break
				case 'right join':
					img = rightJoin_png
					break
				case 'full join':
					img = fullJoin_png
					break
				case 'cross join':
					img = crossJoin_png
					break
				default:
					img = innerJoin_png
			}

			// 在连线上添加删除图标
			conn.connection.addOverlay([
				'Custom',
				{
					create: function (component) {
						let d = document.createElement('img')
						d.setAttribute('src', `${remove_png}`)
						d.setAttribute('alt', '图片显示失败')
						d.setAttribute('style', 'width: 15px; height: 15px; cursor: pointer')
						return d
					},
					location: 0.7, // 位置，0是起始位置，1是终点位置
				},
			])

			// 连接时加上方向箭头
			conn.connection.addOverlay(['Arrow', { width: 14, length: 14, location: 1 }])

			// 在连线上添加连接图标
			conn.connection.addOverlay([
				'Custom',
				{
					create: function (component) {
						let d = document.createElement('img')
						// 默认是内连接
						d.setAttribute('src', `${img}`)
						d.setAttribute('alt', '图片显示失败')
						d.setAttribute('style', 'width: 40px; height: 26px; cursor: pointer')
						return d
					},
					location: 0.3, // 位置
				},
			])
		},
	},
}
</script>

<style lang="scss" scope>
.icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}
</style>
