import { Response } from "@/infra/api/request.types.ts";
import { ITransports } from "@/infra/gateway/transport/types/transports.types.ts";

export namespace ITransportsGateway {
	export namespace GetTransports {
		export type ReturnType = Promise<Response<ITransports.Model[]>>
	}

	export namespace GetTransportById {
		export type ReturnType = Promise<Response<ITransports.Model>>
	}
}