import { createRouter, createWebHistory } from 'vue-router'

import home from "@/modules/route/pages/home.vue";

const routes = [
	{ path: '/', component: home },
	// { path: '/routes', component: },
	// { path: '/transports', component: },
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router