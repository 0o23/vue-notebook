<!--
@author: 许俊杰
@desc: 文件上传表格
@date: 2023/10/12
-->
<template>
	<div class="file-upload-table h-full">
		<div
			class="file-upload-table__upload-dragger"
			:class="{ highlight: isDrag }"
			@click="handleClickUpload"
			@dragover="handleDragover"
			@dragleave="handleDragleave"
			@drop="handleDrop"
		>
			<img class="upload-img" src="@/assets/others/upload.png" alt="上传图片图标" />
			<div class="upload-text">将文件拖到此处，或<em>点击上传</em></div>
			<input
				class="upload-input"
				type="file"
				name="file"
				multiple
				ref="uploadInputRef"
				@change="fileChange"
			/>
		</div>

		<div class="file-upload-table__tip-text">
			<el-alert
				v-for="({ title, type }, index) in alertList"
				:key="index"
				:title="title"
				:type="type"
			></el-alert>
		</div>

		<el-table
			class="file-upload-table__table"
			:data="tableData"
			stripe
			:cell-style="cellStyle"
			:header-cell-style="headerCellStyle"
			empty-text="上传的文件会在这里显示"
			border
		>
			<el-table-column prop="filename" label="文件名"> </el-table-column>
			<el-table-column label="文件预览">
				<template slot-scope="scope">
					<el-image :src="scope.row.imgUrl" :preview-src-list="srcList"> </el-image>
				</template>
			</el-table-column>
			<el-table-column prop="filetype" label="文件类型"> </el-table-column>
			<el-table-column prop="filesize" label="文件大小"> </el-table-column>
			<el-table-column prop="uploadProcess" label="上传进度">
				<template slot-scope="scope">
					<el-progress
						:percentage="scope.row.uploadProcess"
						:color="getProgressColor(scope.row)"
						:format="percentage => getProgressText(percentage, scope.row)"
					></el-progress>
				</template>
			</el-table-column>
			<el-table-column width="122">
				<template slot-scope="scope">
					<!-- 上传中可以取消上传 -->
					<el-button
						v-if="scope.row.status === 'pending' && scope.row.uploadProcess !== 100"
						type="danger"
						size="mini"
						icon="el-icon-close"
						plain
						@click="handleCancelUpload(scope.row)"
					>
						取消上传
					</el-button>

					<!-- 上传失败可以重新上传 -->
					<el-button
						v-if="scope.row.status === 'error'"
						type="warning"
						size="mini"
						icon="el-icon-refresh"
						plain
						@click="handleRefreshUpload(scope.row)"
					>
						重新上传
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'fileUploadTable',

	data() {
		return {
			isDrag: false,

			srcList: [],
			tableData: [],
			alertList: [
				{
					title: '支持多选文件；单个文件大小不可超过7MB；支持上传的文件类型为 JPG/JPEG/PNG',
					type: 'warning',
				},
			],

			cellStyle: {
				height: '40px',
				padding: '0',
			},
			headerCellStyle: {
				height: '40px',
				padding: '0',
				backgroundColor: '#f5f7fa',
			},
		}
	},

	watch: {
		tableData: {
			handler() {
				this.srcList = this.tableData.map(row => row.imgUrl)
			},
			deep: true,
		},
	},

	methods: {
		getProgressText(percentage, row) {
			const { status, uploadProcess } = row

			if (status === 'error') {
				return '失败'
			} else if (uploadProcess === 100) {
				return '完成'
			} else {
				return `${percentage}%`
			}
		},

		getProgressColor(row) {
			const { status, uploadProcess } = row

			if (status === 'error') {
				return '#f56c6c'
			} else if (uploadProcess === 100) {
				return '#67c23a'
			} else {
				return ''
			}
		},

		handleCancelUpload(row) {
			console.log(row)
		},

		handleRefreshUpload(row) {
			console.log(row)
		},

		handleClickUpload() {
			this.$refs.uploadInputRef.click()
		},

		/**
		 * @func 验证文件大小和类型是否合理
		 * @param {File} file
		 * @return {File | null} 如果文件合理, 会将原文件返回, 否则返回 null
		 */
		validateFileAndShowTipText(file) {
			const fileType = ['image/jpeg', 'image/jpg', 'image/png']

			const { type, size, name } = file

			if (!fileType.includes(type)) {
				this.alertList.push({
					title: `${name} 文件不属于 JPG/JPEG/PNG 类型，无法上传`,
					type: 'error',
				})
				return null
			}

			if (size / 1024 / 1024 > 7) {
				this.alertList.push({
					title: `${name} 文件大小超过了 7MB，无法上传`,
					type: 'error',
				})
				return null
			}

			return file
		},

		async fileChange(e) {
			for (const file of e.target.files) {
				const validateRes = this.validateFileAndShowTipText(file)
				if (validateRes !== null) await this.createTableRow(file)
			}
		},

		async createTableRow(file) {
			const imgUrl = await this.getImgFileUrl(file)
			const filename = file.name
			const filetype = file.type
			const filesize = this.formatFilesize(file.size)

			const newRow = {
				filename,
				filetype,
				filesize,
				imgUrl,
				status: 'pending', // 上传状态, 成功或失败后会修改本状态, 本状态决定是否显示或显示什么样的操作按钮
				uploadProcess: 0, // 上传进度初始为 0
			}

			this.tableData.push(newRow)
			this.uploadFile(newRow, file)
		},

		async uploadFile(tableRow, file) {
			const formData = new FormData()
			formData.append('file', file)

			await axios
				.post('http://localhost:3000/upload', formData, {
					onUploadProgress: progressEvent => {
						const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
						this.$set(tableRow, 'uploadProcess', percentCompleted)
					},
				})
				.then(res => {
					this.$set(tableRow, 'status', 'done')
				})
				.catch(error => {
					this.$set(tableRow, 'status', 'error')
				})
		},

		async getImgFileUrl(file) {
			return new Promise(resolve => {
				// 使用 FileReader 读取文件对象
				const reader = new FileReader()
				// 读取完毕后获取结果
				reader.onload = e => {
					resolve(e.target.result)
				}
				// 把文件对象作为一个 dataURL 读入
				reader.readAsDataURL(file)
			})
		},

		formatFilesize(bytes) {
			const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
			if (bytes === 0) return '0 Byte'
			const i = Math.floor(Math.log(bytes) / Math.log(1024))
			return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i]
		},

		handleDragover(e) {
			e.preventDefault() // 阻止默认行为, 否则 drop 事件获取不到文件
			this.isDrag = true
		},

		handleDragleave() {
			this.isDrag = false
		},

		async handleDrop(e) {
			this.isDrag = false
			e.preventDefault()

			for (const file of e.dataTransfer.files) {
				const validateRes = this.validateFileAndShowTipText(file)
				if (validateRes !== null) await this.createTableRow(file)
			}
		},
	},
}
</script>

<style lang="scss" scope>
.file-upload-table {
	.el-table_1_column_2 {
		.cell {
			display: flex;
			padding: 10px;
		}
	}

	.highlight {
		border: 2px dashed #409eff;
		background-color: #ecf5ff;
	}

	&__upload-dragger:hover {
		border-color: #409eff;
	}

	&__upload-dragger {
		background-color: #fff;
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		box-sizing: border-box;
		width: 100%;
		height: 160px;
		text-align: center;
		cursor: pointer;
		position: relative;
		overflow: hidden;

		.upload-img {
			color: #c0c4cc;
			width: 67px;
			margin: 25px 0 16px 50%;
			transform: translateX(-50%);
		}

		.upload-text {
			color: #606266;
			font-size: 14px;
			text-align: center;

			em {
				color: #409eff;
				font-style: normal;
			}
		}

		.upload-input {
			display: none;
		}
	}

	&__tip-text {
		margin-top: 5px;
		font-size: 14px;
		color: #606266;

		.el-alert {
			margin-bottom: 5px;
		}
	}

	&__table {
		.el-image {
			max-height: 100px;
			width: auto;
		}
	}
}
</style>
