<template>
  <div >
    <div class="grid grid-cols-2 gap-6">
      <TransportListItem
        v-for="transport in transports"
        :key="transport.id"
        :transport="transport"
        @update-list="getTransports"
      />
    </div>
    <BaseButton class="mt-6" @click="goToCreateTransport">Create transport</BaseButton>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import TransportListItem from "@/modules/transport/components/TransportCardItem.vue";
import { transportGateway } from "@/modules/transport/gateway/transport.gateway.ts";
import { ITransports } from "@/modules/transport/types/transports.types.ts";
import BaseButton from "@/shared/components/BaseButton.vue";
import { useRouter } from "vue-router";

const router = useRouter()
const transports = ref<ITransports.Model[]>([])
const getTransports = async () => {
	const transportsResponse = await transportGateway.getTransports();

	if (transportsResponse.isSuccess) {
		transports.value = transportsResponse.response
	}
}

const goToCreateTransport = () => router.push('/transport-form/create')

onMounted(getTransports)
</script>
