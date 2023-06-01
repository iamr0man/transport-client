<template>
  <TransportForm
    v-model="transportData"
    :loading="loading"
    @submit="createTransport"
  />
</template>

<script setup lang="ts">
import TransportForm from "@/modules/transport/components/TransportForm.vue";
import { useTransportCreate } from "@/modules/transport/composable/useTransportCreate.ts";

const { transportData, loading, createTransport } = useTransportCreate()
</script>
