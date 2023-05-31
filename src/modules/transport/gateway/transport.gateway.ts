import { errorHandler } from '@/infra/utils/response-check.ts';

import { createRequestService } from '@/infra/api/request.ts';
import type { IRequestService } from '@/infra/api/request.types.ts';
import { ITransports } from "@/modules/transport/types/transports.types.ts";
import { ITransportsGateway } from "@/modules/transport/gateway/types/transports.gateway.types.ts";

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
    getFreeTransportsByType: async (type: ITransports.Enum.Type): ITransportsGateway.GetFreeTransportsByType.ReturnType => {
      try {
        const { data } = await requestService.request<ITransports.Model[]>(
          `/transports?status=${ITransports.Enum.Status.FREE}&type=${type}`,
          'get',
        );

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
        const { data } = await requestService.request<ITransports.ModelWithRelation>(`/transports/${transportId}`, 'get');

        return {
          isSuccess: true,
          response: data
        };
      } catch (e) {
        return errorHandler(e)
      }
    },
    updateTransportById: async (routeId: number, payload: Omit<ITransports.ModelWithRelation, 'id' | 'route'>): ITransportsGateway.UpdateTransportById.ReturnType => {
      try {
        const { data } = await requestService.request<ITransports.Model>(
          `/transports/${routeId}`,
          'put',
          payload
        );

        return {
          isSuccess: true,
          response: data
        };
      } catch (e) {
        return errorHandler(e)
      }
    },
    createTransport: async (payload: ITransports.RawModel): ITransportsGateway.CreateTransport.ReturnType => {
      try {
        const { data } = await requestService.request<ITransports.Model>(
          `/transports`,
          'post',
          payload
        );

        return {
          isSuccess: true,
          response: data
        };
      } catch (e) {
        return errorHandler(e)
      }
    },
    deleteTransportById: async (transportId: number): ITransportsGateway.DeleteTransportById.ReturnType => {
      try {
        await requestService.request<ITransports.Model>(`/transports/${transportId}`, 'delete');

        return {
          isSuccess: true,
          response: true
        };
      } catch (e) {
        return errorHandler(e)
      }
    }
  }
}

export const transportGateway = createTransportGateway(createRequestService())