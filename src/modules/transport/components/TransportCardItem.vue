<template>
    <div class="w-full bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="services" role="tabpanel" aria-labelledby="services-tab">
            <div class="flex justify-between">
                <h2 class="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">{{ transport.type }}</h2>
                <div class="flex gap-1">
                    <BaseButton @click="goEditTransport">Edit</BaseButton>
                    <DangerButton @click="deleteTransport">Delete</DangerButton>
                </div>
            </div>
            <ul role="list" class="space-y-4 text-gray-500 dark:text-gray-400">
                <li class="flex space-x-2">
                    <svg class="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                    <span class="leading-tight">{{ transport.mileage }} km</span>
                </li>
                <li class="flex space-x-2">
                    <svg class="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                    <span class="leading-tight">Model: {{ transport.model }}</span>
                </li>
                <li class="flex space-x-2">
                    <svg class="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                    <span class="leading-tight">License plate: {{ transport.licensePlate }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ITransports } from "@/modules/transport/types/transports.types.ts";
import BaseButton from "@/shared/components/BaseButton.vue";
import DangerButton from "@/shared/components/DangerButton.vue";
import { transportGateway } from "@/modules/transport/gateway/transport.gateway.ts";
import { useRouter } from "vue-router";
import { useNotificationStore } from "@/modules/notification/store/notification.store.ts";

interface Props {
    transport: ITransports.Model
}

interface Events {
    (e: 'updateList'): void
}

const router = useRouter();

const props = defineProps<Props>();

const emits = defineEmits<Events>();

const notificationStore = useNotificationStore()

const goEditTransport = () => router.push(`/transport-form/${props.transport.id}`)
const deleteTransport = async () => {
    const { isSuccess } = await transportGateway.deleteTransportById(props.transport.id)

    if (isSuccess) {
        notificationStore.send('Transport deleted successfully')
        return
    }
    notificationStore.sendError('Transport has not been deleted')

    emits('updateList')
}
</script>