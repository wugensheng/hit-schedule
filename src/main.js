import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible' // 自动设置根标签的字体大小
import 'vue-easytable/libs/theme-default/index.css'
import { NavBar, Form, Field, Tabbar, TabbarItem } from 'vant'
import { VeTable, VePagination } from 'vue-easytable'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.use(VePagination)
Vue.use(VeTable)

Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Form)
Vue.use(Field)
Vue.use(NavBar)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate () {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
