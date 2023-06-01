import { onMounted, ref } from "vue";
import { ITransports } from "@/modules/transport/types/transports.types.ts";
import { transportGateway } from "@/modules/transport/gateway/transport.gateway.ts";

export const useTransports = () => {
	const transports = ref<ITransports.Model[]>([])
	const getTransports = async () => {
		const transportsResponse = await transportGateway.getTransports();

		if (transportsResponse.isSuccess) {
			transports.value = transportsResponse.response
		}
	}
	onMounted(getTransports)

	return {
		transports,
		getTransports
	}
}