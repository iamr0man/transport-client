<template>
   <RouteForm
       v-model="routeData"
       :free-transports="freeTransports"
       :loading="loading"
       @submit="createRoute"
   />
</template>

<script lang="ts" setup>
import RouteForm from "@/modules/route/components/RouteForm.vue";
import { useRouteCreate } from "@/modules/route/composable/useRouteCreate.ts";

const { routeData, freeTransports, loading, createRoute} = useRouteCreate()
</script>