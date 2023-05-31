import { IRoutes } from "@/modules/route/types/route.types.ts";

export namespace ITransports {
	export namespace Enum {

		export enum Status {
			FREE = 'FREE',
			BUSY = 'BUSY'
		}
		export enum Type {
			TRUCK = 'TRUCK',
			PLANE = 'PLANE',
			TRAIN = 'TRAIN',
			SHIP = 'SHIP',
		}
	}

	export interface Model {
		id: number
		licensePlate: string
		status: Enum.Status
		model: string
		purchaseDate: Date
		mileage: number
		type: Enum.Type;
	}

	export type RawModel = Omit<Model, 'id'>

	export type ModelWithRelation = Model & { route: IRoutes.Model[] }
}