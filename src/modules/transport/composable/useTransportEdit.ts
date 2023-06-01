import { useRoute } from "vue-router";
import { useNotificationStore } from "@/modules/notification/store/notification.store.ts";
import { ref } from "vue";
import { ITransports } from "@/modules/transport/types/transports.types.ts";
import { transportGateway } from "@/modules/transport/gateway/transport.gateway.ts";

export const useTransportEdit = () => {
	const route = useRoute()

	const notificationStore = useNotificationStore()

	const loading = ref(false)

	const transportData = ref<ITransports.ModelWithRelation>({} as ITransports.ModelWithRelation)

	transportGateway.getTransportById(route.params.id as string).then(transportResponse => {
		if (transportResponse.isSuccess) {
			transportData.value = transportResponse.response
		}
	})


	const updateTransport = async () => {
		loading.value = true

		const { id, route: routes, ...payload } = transportData.value
		const { isSuccess } = await transportGateway.updateTransportById(id, payload)

		loading.value = false;
		if (isSuccess) {
			notificationStore.send('Transport updated successfully')
			return
		}
		notificationStore.sendError('Transport has not been updated')
	}

	return {
		loading,
		transportData,
		updateTransport
	}
}