import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout'
import CodeMirror from '@/views/library-or-plugin/Codemirror.vue'
import VueJson from '@/views/library-or-plugin/VueJson.vue'
import ColumnWidthStretchingVue from '@/views/css-correlation/column-width-stretching'
import LargeFileUpload from '@/views/others/large-file-upload'
// import MixinReact from '@/views/others/mixin-react'
import fileUploadTable from '@/views/others/file-upload-table'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Layout',
		component: Layout,
		children: [
			{
				path: 'codemirror',
				name: 'Codemirror',
				component: CodeMirror,
			},
			{
				path: 'vue-json',
				name: 'VueJson',
				component: VueJson,
			},
			{
				path: 'column-width-stretching',
				name: 'ColumnWidthStretchingVue',
				component: ColumnWidthStretchingVue,
			},
			{
				path: 'large-file-upload',
				name: 'LargeFileUpload',
				component: LargeFileUpload,
			},

			{
				path: 'file-upload-table',
				name: 'fileUploadTable',
				component: fileUploadTable,
			},

			,
		],
	},
]

const router = new VueRouter({
	mode: 'hash',
	routes,
})

export default router
