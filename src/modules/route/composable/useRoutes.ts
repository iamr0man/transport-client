import { onMounted, ref } from "vue";
import { IRoutes } from "@/modules/route/types/route.types.ts";
import { routeGateway } from "@/modules/route/gateway/route.gateway.ts";

export const useRoutes = () => {
	const routeList = ref<IRoutes.ModelWithRelation[]>([])

	const getRoutes = () => routeGateway.getRoutes().then(payload => {
		if (payload.isSuccess) {
			routeList.value = payload.response
		}
	})

	onMounted(getRoutes)

	return {
		routeList,
		getRoutes
	}
}