import { ITransports } from "@/modules/transport/types/transports.types.ts";

export namespace IRoutes {
	export namespace Enum {
		export enum Status {
			'PREPARING' = 'PREPARING',
			'PROCESSING' = 'PROCESSING',
			'COMPLETED' = 'COMPLETED',
		}
	}

	export interface Model {
		id: number
		cityStart: string;
		cityEnd: string;
		distanceBetweenCities: number;
		sendingDate: Date;
		deliveryDate: Date;
		status: Enum.Status;
		transportType: ITransports.Enum.Type;
		revenue: number;
		transportId: number | null;
	}

	export type RawModel = Omit<Model, 'id'>

	export type ModelWithRelation = Model & { transport: ITransports.Model }

	export type RawModelWithRelation = RawModel & { transport: ITransports.Model | null }

}