import { errorHandler } from '@/infra/utils/response-check.ts';

import { createRequestService } from '@/infra/api/request.ts';
import type { IRequestService } from '@/infra/api/request.types.ts';
import { ITransports } from "@/infra/gateway/transport/types/transports.types.ts";
import { ITransportsGateway } from "@/infra/gateway/transport/types/transports.gateway.types.ts";

export const createTransportGateway = (requestService: IRequestService) => {
  return {
    getTransports: async (): ITransportsGateway.GetTransports.ReturnType => {
      try {
        const { data } = await requestService.request<ITransports.Model[]>('/transports', 'get');

        return {
          isSuccess: true,
          response: data
        };
      } catch (e) {
        return errorHandler(e)
      }
    },
    getTransportById: async (transportId: string): ITransportsGateway.GetTransportById.ReturnType => {
      try {
        const { data } = await requestService.request<ITransports.Model>(`/transports/${transportId}`, 'get');

        return {
          isSuccess: true,
          response: data
        };
      } catch (e) {
        return errorHandler(e)
      }
    }
  }
}

export const transportGateway = createTransportGateway(createRequestService())