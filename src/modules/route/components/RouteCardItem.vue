<template>
    <div class="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="services" role="tabpanel" aria-labelledby="services-tab">
        <div class="flex justify-between">
            <h2 class="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">{{ route.status }}</h2>
            <div class="flex gap-1">
                <BaseButton class="cursor-pointer" @click="goEditRoute">Edit</BaseButton>
                <DangerButton class="cursor-pointer" @click="deleteRoute">Delete</DangerButton>
            </div>
        </div>
        <ul role="list" class="space-y-4 text-gray-500 dark:text-gray-400">
            <li class="flex space-x-2">
                <svg class="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                <span class="leading-tight">{{ route.cityStart }} -> {{ route.cityEnd }}</span>
            </li>
            <li class="flex space-x-2">
                <svg class="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                <span class="leading-tight">{{ new Date(route.sendingDate).toLocaleDateString() }} -> {{ new Date(route.deliveryDate).toLocaleDateString() }}</span>
            </li>
            <li class="flex space-x-2">
                <svg class="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                <span class="leading-tight">Transport type: {{ route.transportType }}</span>
            </li>
            <li class="flex space-x-2 items-center">
                <svg class="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                <span class="leading-tight base">Revenue: ${{ route.revenue }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import DangerButton from "@/shared/components/DangerButton.vue";
import BaseButton from "@/shared/components/BaseButton.vue";
import { IRoutes } from "@/modules/route/types/route.types.ts";
import router from "@/router/router.ts";
import { routeGateway } from "@/modules/route/gateway/route.gateway.ts";
import { useNotificationStore } from "@/modules/notification/store/notification.store.ts";

interface Props {
	route: IRoutes.ModelWithRelation
}

interface Events {
	(e: 'updateList'): void;
}

const props = defineProps<Props>()
const emits = defineEmits<Events>()

const notificationStore = useNotificationStore()

const goEditRoute = () => router.push(`/route-form/${props.route.id}`)

const deleteRoute = async () => {
	const { isSuccess } = await routeGateway.deleteRouteById(props.route.id)

  if (isSuccess) {
    notificationStore.send('Route deleted successfully')
    return
  }
  notificationStore.sendError('Route has not been deleted')

	emits('updateList')
}
</script>