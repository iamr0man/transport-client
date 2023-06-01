import { useRoute } from "vue-router";
import { useNotificationStore } from "@/modules/notification/store/notification.store.ts";
import { onMounted, ref, watch } from "vue";
import { IRoutes } from "@/modules/route/types/route.types.ts";
import { ITransports } from "@/modules/transport/types/transports.types.ts";
import { routeGateway } from "@/modules/route/gateway/route.gateway.ts";
import { transportGateway } from "@/modules/transport/gateway/transport.gateway.ts";

export const useRouteEdit = () => {
	const route = useRoute();
	const notificationStore  = useNotificationStore()

	const loading = ref(false)
	const routeData = ref<IRoutes.ModelWithRelation>({} as IRoutes.ModelWithRelation)
	const freeTransports = ref<ITransports.Model[]>([]);

	routeGateway.getRouteById(route.params.id as string).then(routeResponse => {
		if (routeResponse.isSuccess) {
			routeData.value = routeResponse.response
		}
	})


	const getFreeTransports = async () => {

		const transportType = routeData.value?.transportType

		if (transportType) {
			loading.value = true;
			const freeTransportResponse = await transportGateway.getFreeTransportsByType(transportType)

			if (freeTransportResponse.isSuccess) {
				freeTransports.value = freeTransportResponse.response
			}
			loading.value = false;
		}

	}

	const updateRoute = async () => {
		loading.value = true;
		const { id, transport, ...payload } = routeData.value;

		const { isSuccess } = await routeGateway.updateRouteById(route.params.id as string, payload)

		loading.value = false;
		if (isSuccess) {
			notificationStore.send('Route updated successfully')
			return
		}
		notificationStore.sendError('Route has not been updated')
	}

	watch(() => routeData.value?.transportType, getFreeTransports)

	onMounted(getFreeTransports)

	return {
		loading,
		routeData,
		freeTransports,
		updateRoute
	}
}