import { ITransports } from "@/modules/transport/types/transports.types.ts";
import { useNotificationStore } from "@/modules/notification/store/notification.store.ts";
import { ref } from "vue";
import { transportGateway } from "@/modules/transport/gateway/transport.gateway.ts";

export const useTransportCreate = () => {
	const baseTransport = {
		licensePlate: '',
		status: ITransports.Enum.Status.FREE,
		model: '',
		purchaseDate: new Date(),
		mileage: 0,
		type: ITransports.Enum.Type.TRUCK,
		route: []
	}

	const notificationStore = useNotificationStore()

	const transportData = ref<Omit<ITransports.ModelWithRelation, 'id'>>(baseTransport)

	const loading = ref(false)

	const createTransport = async () => {
		loading.value = true

		const { route, ...payload } = transportData.value

		const { isSuccess } = await transportGateway.createTransport(payload)

		loading.value = false;
		if (isSuccess) {
			notificationStore.send('Transport created successfully')
			return
		}
		notificationStore.sendError('Transport has not been created')
	}

	return {
		transportData,
		loading,
		createTransport
	}
}