import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import router from './router'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import "@mdi/font/css/materialdesignicons.css";
import VueCookies from 'vue-cookies'
import axios from 'axios'
axios.defaults.withCredentials = true;
const vuetify = createVuetify({
  components,
  directives,
})
const app = createApp(App)
app.config.globalProperties.$isLogin = false
app.use(vuetify)
app.use(router)
app.use(VueCookies)
// app.use(axios)
app.mount('#app')
router.beforeEach((to, from, next) => {
  // Kiểm tra xem trang hiện tại yêu cầu đăng nhập không
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Nếu trang yêu cầu đăng nhập và người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
    if (!isLoggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath } // lưu lại địa chỉ của trang cần truy cập để sau khi đăng nhập thành công, chuyển hướng lại đúng trang đó
      })
      window.scrollTo(0);
    } else {
      next() // Nếu đã đăng nhập, cho phép truy cập
      window.scrollTo(0);
    }
  } else {
    next() // Nếu không yêu cầu đăng nhập, cho phép truy cập
    window.scrollTo(0);
  }
})
function isLoggedIn() {
  if ($cookies.get("ato")) {
    return true
  } else {
    return false
  }
}