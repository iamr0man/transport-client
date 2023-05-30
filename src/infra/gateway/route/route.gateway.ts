import { errorHandler } from '@/infra/utils/response-check.ts';

import { createRequestService } from '@/infra/api/request.ts';
import type { IRequestService } from '@/infra/api/request.types.ts';

import { IRoutesGateway } from "@/infra/gateway/route/types/route.gateway.types.ts";
import { IRoutes } from "@/infra/gateway/route/types/route.types.ts";


export const createRouteGateway = (requestService: IRequestService) => {
  return {
    getRoutes: async (): IRoutesGateway.GeIRoutes.ReturnType => {
      try {
        const { data } = await requestService.request<IRoutes.Model[]>('/routes', 'get');

        return {
          isSuccess: true,
          response: data
        };
      } catch (e) {
        return errorHandler(e)
      }
    },
    getRouteById: async (routeId: string): IRoutesGateway.GetRouteById.ReturnType => {
      try {
        const { data } = await requestService.request<IRoutes.Model>(`/routes/${routeId}`, 'get');

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

export const routeGateway = createRouteGateway(createRequestService())