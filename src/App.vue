<template>
    <Suspense>
        <template #default>
            <RouterView v-slot="{ Component }">
                <Sidebar>
                    <transition name="scale">
                        <component :is="Component" />
                    </transition>
                    <Notification />
                </Sidebar>
            </RouterView>
        </template>
        <template #fallback>
            <span>Loading...</span>
        </template>
    </Suspense>
</template>

<script setup lang="ts">
import Sidebar from "@/shared/components/Sidebar.vue";
import { transportGateway } from "@/modules/transport/gateway/transport.gateway.ts";
import Notification from "@/modules/notification/components/Notification.vue";

transportGateway.getTransports()
</script>

<style>
.scale-enter-active,
.scale-leave-active {
    transition: all 0.5s ease;
}
.scale-enter-from,
.scale-leave-to {
    opacity: 0;
    transform: scale(0.9);
}
</style>
