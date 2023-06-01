<template>
    <div class="w-full bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <ul id="defaultTab" class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" data-tabs-toggle="#defaultTabContent" role="tablist">
            <li class="mr-2">
                <button type="button" role="tab" :class="{ 'dark:text-blue-500': !showTransportTab }" class="inline-block p-4 rounded-tl-lg dark:bg-gray-800 dark:hover:bg-gray-700" @click="showTransportTab = false">Route</button>
            </li>
            <li class="mr-2">
                <button type="button" role="tab" :class="{ 'dark:text-blue-500': showTransportTab }" class="inline-block p-4 dark:hover:bg-gray-700" @click="showTransportTab = true">Transport</button>
            </li>
        </ul>
        <RouteCardItem v-if="!showTransportTab" :route="route" @update-list="emits('updateList')" />
        <TransportCardItem v-else :transport="route.transport" @update-list="emits('updateList')" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import TransportCardItem from "@/modules/transport/components/TransportCardItem.vue";
import { IRoutes } from "@/modules/route/types/route.types.ts";
import RouteCardItem from "@/modules/route/components/RouteCardItem.vue";

interface Props {
    route: IRoutes.ModelWithRelation
}

interface Events {
    (e: 'updateList'): void;
}

defineProps<Props>()
const emits = defineEmits<Events>()

const showTransportTab = ref(false);
</script>