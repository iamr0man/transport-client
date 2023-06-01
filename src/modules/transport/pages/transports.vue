<template>
 <TransportList :transports="transports" @get-transports="getTransports" />
</template>

<script lang="ts" setup>

import TransportList from "@/modules/transport/components/TransportList.vue";
import { useTransports } from "@/modules/transport/composable/useTransports.ts";

const { transports, getTransports } = useTransports()
</script>