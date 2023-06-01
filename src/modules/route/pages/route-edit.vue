<template>
    <RouteForm
        v-model="routeData"
        :free-transports="freeTransports"
        :loading="loading"
        @submit="updateRoute"
    />
</template>

<script lang="ts" setup>
import RouteForm from "@/modules/route/components/RouteForm.vue";
import { useRouteEdit } from "@/modules/route/composable/useRouteEdit.ts";

const { routeData, freeTransports, loading, updateRoute} =useRouteEdit()
</script>