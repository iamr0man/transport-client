<template>
  <TransportForm
    :transport-data="transportData"
    :loading="loading"
    @submit="updateTransport"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import TransportForm from "@/modules/transport/components/TransportForm.vue";
import { ITransports } from "@/modules/transport/types/transports.types.ts";
import { useNotificationStore } from "@/modules/notification/store/notification.store.ts";
import { transportGateway } from "@/modules/transport/gateway/transport.gateway.ts";

const route = useRoute()

const notificationStore = useNotificationStore()

const loading = ref(false)

const transportData = ref<ITransports.ModelWithRelation>({} as ITransports.ModelWithRelation)

const transportResponse = await transportGateway.getTransportById(route.params.id as string)

if (transportResponse.isSuccess) {
	transportData.value = transportResponse.response
}

const updateTransport = async () => {
  loading.value = true

  const { id, route, ...payload } = transportData.value
  const { isSuccess } = await transportGateway.updateTransportById(id, payload)

  loading.value = false;
  if (isSuccess) {
    notificationStore.send('Transport updated successfully')
    return
  }
  notificationStore.sendError('Transport has not been updated')
}
</script>
