<template>
    <div>
      <div class="mx-auto grid grid-cols-2 gap-6 divide-y divide-gray-200 dark:divide-gray-700">
        <RouteListItem
          v-for="route in routeList"
          :key="route.id"
          :route="route"
          @update-list="getRoutes"
        />
      </div>
      <BaseButton class="mt-6" @click="goToCreateRoute">Create route</BaseButton>
    </div>
</template>

<script lang="ts" setup>
import RouteListItem from "@/modules/route/components/RouteListItem.vue";
import BaseButton from "@/shared/components/BaseButton.vue";
import { useRouter } from "vue-router";
import { useRoutes } from "@/modules/route/composable/useRoutes.ts";

const router = useRouter();

const goToCreateRoute = () => router.push('/route-form/create')

const { routeList, getRoutes } = useRoutes()
</script>
