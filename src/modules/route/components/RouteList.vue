<template>
  <ContainerWrapper>
    <ul class="mx-auto max-w-md divide-y divide-gray-200 dark:divide-gray-700">
      <RouteListItem
        v-for="route in routeList"
        :key="route.id"
        :route="route"
      />
    </ul>
  </ContainerWrapper>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import RouteListItem from "@/modules/route/components/RouteListItem.vue";
import { routeGateway } from "@/infra/gateway/route/route.gateway.ts";
import { IRoutes } from "@/infra/gateway/route/types/route.types.ts";
import ContainerWrapper from "@/shared/components/ContainerWrapper.vue";

const routeList = ref<IRoutes.Model[]>([])

routeGateway.getRoutes().then(payload => {
	if (payload.isSuccess) {
    routeList.value = payload.response
  }
})
</script>
