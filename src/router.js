import Home from './pages/Home.vue'
import PrayTimeResult from './pages/PrayTimeResult.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/result/:city', component: PrayTimeResult }
]

export default routes