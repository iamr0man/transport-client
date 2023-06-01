<template>
  <TransportForm
    v-model="transportData"
    :loading="loading"
    @submit="updateTransport"
  />
</template>

<script setup lang="ts">
import TransportForm from "@/modules/transport/components/TransportForm.vue";
import { useTransportEdit } from "@/modules/transport/composable/useTransportEdit.ts";

const { loading, transportData, updateTransport } = useTransportEdit()

</script>
