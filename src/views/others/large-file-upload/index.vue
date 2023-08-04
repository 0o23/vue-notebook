<!--
@author: 许俊杰
@desc: 大文件上传
@date: 2023/06/26
-->
<template>
	<div class="large-file-upload">
		<input type="file" ref="inputRef" @change="changeFile" />

		<div>----------------------------</div>

		<div>文件 <span class="bigFileC">📁</span> 分为了{{ chunksCount }}片</div>

		<div>----------------------------</div>

		<div>计算文件的hash值进度</div>
		<progress :value="hashProgress" max="100"></progress> {{ hashProgress }}%
		<div class="r">hash值为: {{ fileHash }}</div>

		<div>----------------------------</div>

		<div>上传文件的进度</div>
		<progress :value="fileProgress" max="100"></progress> {{ fileProgress }}%
		<div class="r" v-show="fileProgress == 100">文件上传完成</div>
	</div>
</template>

<script>
import SparkMD5 from 'spark-md5'

export default {
	name: 'LargeFileUpload',

	data() {
		return {
			chunksCount: 0,
			hashProgress: 0,
			fileProgress: 0,

			fileHash: '',
		}
	},

	methods: {
		async changeFile() {
			const file = this.$refs.inputRef.files[0] // 拿到文件
			const chunks = this.sliceFile(file) // 给文件切片
			this.fileHash = await this.getFileMd5(chunks)
			this.chunksCount = chunks.length
		},

		sliceFile(file, chunkSize = 1 * 1024 * 1024) {
			const result = []
			// 从第 0 字节开始切割, 一次切割 1 * 1024 * 1024 字节(1MB)
			for (let i = 0; i < file.size; i += chunkSize) {
				result.push(file.slice(i, i + chunkSize))
			}
			return result
		},

		getFileMd5(chunks, progressCallbackFn) {
			return new Promise((resolve, reject) => {
				let currentChunk = 0 // 准备从第0块开始读
				let spark = new SparkMD5.ArrayBuffer() // 实例化spark-md5
				let fileReader = new FileReader() // 实例化文件阅读器

				fileReader.onerror = reject // 兜一下错

				fileReader.onload = e => {
					// progressCallbackFn(Math.ceil((currentChunk / chunks.length) * 100)) // 抛出一个函数，用于告知进度
					spark.append(e.target.result) // 将二进制文件追加到spark中（官方方法）
					currentChunk = currentChunk + 1 // 这个读完就加1，读取下一个blob
					// 若未读取到最后一块，就继续读取；否则读取完成，Promise带出结果
					if (currentChunk < chunks.length) {
						fileReader.readAsArrayBuffer(chunks[currentChunk])
					} else {
						resolve(spark.end()) // resolve出去告知结果 spark.end官方api
					}
				}
				// 文件读取器的readAsArrayBuffer方法开始读取文件，从blob数组中的第0项开始
				fileReader.readAsArrayBuffer(chunks[currentChunk])
			})
		},
	},
}
</script>

<style lang="scss" scope></style>
