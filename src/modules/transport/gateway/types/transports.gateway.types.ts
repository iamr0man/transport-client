import { Response } from "@/infra/api/request.types.ts";
import { ITransports } from "@/modules/transport/types/transports.types.ts";

export namespace ITransportsGateway {
	export namespace GetTransports {
		export type ReturnType = Promise<Response<ITransports.Model[]>>
	}

	export namespace GetFreeTransportsByType {
		export type ReturnType = Promise<Response<ITransports.Model[]>>
	}

	export namespace GetTransportById {
		export type ReturnType = Promise<Response<ITransports.ModelWithRelation>>
	}

	export namespace CreateTransport {
		export type ReturnType = Promise<Response<ITransports.Model>>
	}

	export namespace UpdateTransportById {
		export type ReturnType = Promise<Response<ITransports.Model>>
	}

	export namespace DeleteTransportById {
		export type ReturnType = Promise<Response<boolean>>
	}
}