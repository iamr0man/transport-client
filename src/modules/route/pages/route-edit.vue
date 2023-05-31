<template>
    <RouteForm
        v-model="routeData"
        :free-transports="freeTransports"
        :loading="loading"
        @submit="updateRoute"
    />
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { routeGateway } from "@/modules/route/gateway/route.gateway.ts";
import { IRoutes } from "@/modules/route/types/route.types.ts";
import { useRoute } from "vue-router";
import { useNotificationStore } from "@/modules/notification/store/notification.store.ts";
import RouteForm from "@/modules/route/components/RouteForm.vue";
import { transportGateway } from "@/modules/transport/gateway/transport.gateway.ts";
import { ITransports } from "@/modules/transport/types/transports.types.ts";

const route = useRoute();
const notificationStore  = useNotificationStore()

const loading = ref(false)
const routeData = ref<IRoutes.ModelWithRelation>({} as IRoutes.ModelWithRelation)
const freeTransports = ref<ITransports.Model[]>([]);

const routeResponse = await routeGateway.getRouteById(route.params.id as string)

if (routeResponse.isSuccess) {
    routeData.value = routeResponse.response
}

const getFreeTransports = async () => {

    const transportType = routeData.value?.transportType

    if (transportType) {
        loading.value = true;
        const freeTransportResponse = await transportGateway.getFreeTransportsByType(transportType)

        if (freeTransportResponse.isSuccess) {
            freeTransports.value = freeTransportResponse.response
        }
        loading.value = false;
    }

}

const updateRoute = async () => {
    loading.value = true;
    const { id, transport, ...payload } = routeData.value;

    const { isSuccess } = await routeGateway.updateRouteById(route.params.id as string, payload)

    loading.value = false;
    if (isSuccess) {
        notificationStore.send('Route updated successfully')
        return
    }
    notificationStore.sendError('Route has not been updated')
}

watch(() => routeData.value?.transportType, getFreeTransports)

onMounted(getFreeTransports)
</script>