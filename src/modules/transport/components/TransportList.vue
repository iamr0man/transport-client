<template>
  <div >
    <div class="grid grid-cols-2 gap-6">
      <TransportListItem
        v-for="transport in transports"
        :key="transport.id"
        :transport="transport"
        @update-list="emits('getTransports')"
      />
    </div>
    <BaseButton class="mt-6" @click="goToCreateTransport">Create transport</BaseButton>
  </div>
</template>

<script setup lang="ts">
import TransportListItem from "@/modules/transport/components/TransportCardItem.vue";
import BaseButton from "@/shared/components/BaseButton.vue";
import { useRouter } from "vue-router";
import { ITransports } from "@/modules/transport/types/transports.types.ts";

interface Props {
	transports: ITransports.Model[];
}

interface Events {
	(e: 'getTransports'): void
}

defineProps<Props>()
const emits = defineEmits<Events>()

const router = useRouter()

const goToCreateTransport = () => router.push('/transport-form/create')

</script>
