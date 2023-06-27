import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局导入 ElementUI 组件库及其样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 导入全局样式文件
import '@/styles/index.css'

// 导入 tailwindCSS
import '@/styles/tailwind.css'

// 导入全局图标文件
import '@/icons/iconfont.js'

// 将 SvgIcon 组件注册为全局的基础组件
import SvgIcon from '@/components/SvgIcon'
Vue.component('SvgIcon', SvgIcon)

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
