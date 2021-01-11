import { createApp } from 'vue';
import store from './store';
import App from './App.vue';
import './index.css';
import './services/font-awesome';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const app = createApp(App);

app.use(store);
app.component('fa', FontAwesomeIcon);
app.mount('#app');
