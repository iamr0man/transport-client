<template>
    <component
        v-show="notificationStore.show"
        class="fixed bottom-5 right-5"
        :is="toastComponent"
        @close="notificationStore.show = false"
    >{{ notificationStore.message }}
    </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useNotificationStore } from "@/modules/notification/store/notification.store.ts";
import { IStoreNotification } from "@/modules/notification/store/notification.types.ts";
import ToastSuccess from "@/modules/notification/components/ToastSuccess.vue";
import ToastDanger from "@/modules/notification/components/ToastDanger.vue";

const notificationStore = useNotificationStore();

const toastComponent = computed(() =>
	notificationStore.type === IStoreNotification.Enum.Type.SUCCESS ? ToastSuccess : ToastDanger,
);
</script>

<style lang="scss" scoped></style>
