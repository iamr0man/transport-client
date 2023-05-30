<template>
    <li class="pt-3 pb-0 sm:pt-4">
        <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
                <component :is="iconComponent" class="w-6 h-6" />
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {{ route.cityStart }} | {{ route.cityEnd }}
                </p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                    {{ new Date(route.sendingDate).toLocaleDateString() }} | {{ new Date(route.deliveryDate).toLocaleDateString() }}
                </p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {{ route.revenue }}
            </div>
        </div>
    </li>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { IRoutes } from "@/infra/gateway/route/types/route.types.ts";
import IconArrowRotate from "@/shared/icons/IconArrowRotate.vue";
import IconCheck from "@/shared/icons/IconCheck.vue";

interface Props {
    route: IRoutes.Model
}

const props = defineProps<Props>()

const iconComponent = computed(() => {
    switch (props.route.status) {
        case IRoutes.Enum.Status.PROCESSING:
            return IconArrowRotate;
        case IRoutes.Enum.Status.COMPLETED:
            return IconCheck;
        default:
            return IconArrowRotate;
    }
})
</script>