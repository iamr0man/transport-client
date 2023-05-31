<template>
  <TransportForm
    :transport-data="transportData"
    :loading="loading"
    @submit="createTransport"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import TransportForm from "@/modules/transport/components/TransportForm.vue";
import { ITransports } from "@/modules/transport/types/transports.types.ts";
import { useNotificationStore } from "@/modules/notification/store/notification.store.ts";
import { transportGateway } from "@/modules/transport/gateway/transport.gateway.ts";

const baseTransport = {
	licensePlate: '',
	status: ITransports.Enum.Status.FREE,
	model: '',
	purchaseDate: new Date(),
	mileage: 0,
	type: ITransports.Enum.Type.TRUCK,
  route: []
}

const notificationStore = useNotificationStore()

const transportData = ref<Omit<ITransports.ModelWithRelation, 'id'>>(baseTransport)

const loading = ref(false)

const createTransport = async () => {
	const loading = ref(false)

  loading.value = true

  const { isSuccess } = await transportGateway.createTransport(transportData.value)

  loading.value = false;
  if (isSuccess) {
    notificationStore.send('Transport created successfully')
    return
  }
  notificationStore.sendError('Transport has not been created')
}
</script>
