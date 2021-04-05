import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import store from './store';
import routes from './router';
import App from './App.vue';
import './index.css';
import './services/font-awesome';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App);

app.use(router);
app.use(store);
app.component('fa', FontAwesomeIcon);
app.mount('#app');
