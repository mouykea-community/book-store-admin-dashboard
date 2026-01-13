import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Toast from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import App from './App.vue'
import router from './router'
import BaseModal from './components/ui/base/BaseModal.vue';
import '@/assets/css/main.css';
const app = createApp(App)

app.use(createPinia())
app.use(router)
    .use(Toast, {
        position: 'top-center',
        autoClose: 1500
    })
app.component('BaseModal', BaseModal);
app.mount('#app')
