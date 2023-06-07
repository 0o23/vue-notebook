<template>
	<div class="sql-editor h-1/2 border">
		<codemirror v-model="sqlScript" :options="cmOptions" ref="codemirror"></codemirror>
	</div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/idea.css'
import 'codemirror/mode/sql/sql.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/sql-hint'
import '@/utils/codemirror/active-line.js'

export default {
	name: 'SqlEditor',

	components: {
		codemirror,
	},

	data() {
		return {
			sqlScript: '',

			cmOptions: {
				mode: 'text/x-mariadb',
				theme: 'default', //主题
				keyMap: 'default',
				lineNumbers: true,
				foldGutter: false, // 是否折叠
				styleActiveLine: true, // 高亮行功能
				extraKeys: { tab: 'autocomplete' },
				lineWrapping: true, // 代码折叠
				hintOptions: {
					completeSingle: false, // 避免只有一个智能提示时的自动填充
					tables: {
						// 联想项: [联想项的分支1, 联想项的分支2, 联想项的分支3],
						// table1: ["c1", "c2", "c3"]
						custom_table: ['custom_field1', 'custom_field2', 'custom_field3'],
					},
				},
			},
		}
	},

	mounted() {
		this.$refs.codemirror.codemirror.on('inputRead', cm => cm.showHint())
	},

	methods: {},
}
</script>

<style lang="scss" scoped>
.sql-editor {
	::v-deep .vue-codemirror {
		height: 100%;
	}

	::v-deep .CodeMirror {
		height: 100%;
	}
}
</style>
