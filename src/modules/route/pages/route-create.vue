<template>
   <RouteForm
       v-model="routeData"
       :free-transports="freeTransports"
       :loading="loading"
       @submit="createRoute"
   />
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { routeGateway } from "@/modules/route/gateway/route.gateway.ts";
import { IRoutes } from "@/modules/route/types/route.types.ts";
import { useNotificationStore } from "@/modules/notification/store/notification.store.ts";
import RouteForm from "@/modules/route/components/RouteForm.vue";
import { transportGateway } from "@/modules/transport/gateway/transport.gateway.ts";
import { ITransports } from "@/modules/transport/types/transports.types.ts";

const notificationStore  = useNotificationStore()

const loading = ref(false)

const baseRoute: IRoutes.RawModelWithRelation = {
   cityStart: '',
   cityEnd: '',
   distanceBetweenCities: 0,
   sendingDate: new Date(),
   deliveryDate: new Date(),
   status: IRoutes.Enum.Status.PREPARING,
   transportType: ITransports.Enum.Type.TRUCK,
   revenue: 0,
   transportId: 0,
   transport: null
}

const routeData = ref<Omit<IRoutes.RawModelWithRelation, 'id'>>(baseRoute)

const freeTransports = ref<ITransports.Model[]>([]);

const getFreeTransports = async () => {
   loading.value = true;
   const freeTransportResponse = await transportGateway.getFreeTransportsByType(routeData.value.transportType)

   if (freeTransportResponse.isSuccess) {
      freeTransports.value = freeTransportResponse.response
   }
   loading.value = false;
}

const createRoute = async () => {
   loading.value = true;

   const { isSuccess } = await routeGateway.createRoute(routeData.value)

   loading.value = false;
   if (isSuccess) {
      notificationStore.send('Route created successfully')
      return
   }
   notificationStore.sendError('Route has not been created')
}

watch(() => routeData.value?.transportType, getFreeTransports)

onMounted(getFreeTransports)
</script>