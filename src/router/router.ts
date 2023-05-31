import { createRouter, createWebHistory } from 'vue-router'

import home from "@/modules/route/pages/home.vue";
import RouteCreate from "@/modules/route/pages/route-create.vue";
import TransportList from "@/modules/transport/components/TransportList.vue";
import TransportCreate from "@/modules/transport/pages/transport-create.vue";
import TransportEdit from "@/modules/transport/pages/transport-edit.vue";
import RouteEdit from "@/modules/route/pages/route-edit.vue";

const routes = [
	{ path: '/', component: home },
	{ path: '/route-form/:id', component: RouteEdit },
	{ path: '/route-form/create', component: RouteCreate },
	{ path: '/transports', component: TransportList },
	{ path: '/transport-form/:id', component: TransportEdit },
	{ path: '/transport-form/create', component: TransportCreate },
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router