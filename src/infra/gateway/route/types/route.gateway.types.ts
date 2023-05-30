import { Response } from "@/infra/api/request.types.ts";
import { IRoutes } from "@/infra/gateway/route/types/route.types.ts";

export namespace IRoutesGateway {
	export namespace GeIRoutes {
		export type ReturnType = Promise<Response<IRoutes.Model[]>>
	}

	export namespace GetRouteById {
		export type ReturnType = Promise<Response<IRoutes.Model>>
	}
}