import { errorHandler } from '@/infra/utils/response-check.ts';

import { createRequestService } from '@/infra/api/request.ts';
import type { IRequestService } from '@/infra/api/request.types.ts';

import { IRoutesGateway } from "@/modules/route/gateway/types/route.gateway.types.ts";
import { IRoutes } from "@/modules/route/types/route.types.ts";


export const createRouteGateway = (requestService: IRequestService) => {
  return {
    getRoutes: async (): IRoutesGateway.GeIRoutes.ReturnType => {
      try {
        const { data } = await requestService.request<IRoutes.ModelWithRelation[]>('/routes', 'get');

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
        const { data } = await requestService.request<IRoutes.ModelWithRelation>(`/routes/${routeId}`, 'get');

        return {
          isSuccess: true,
          response: data
        };
      } catch (e) {
        return errorHandler(e)
      }
    },
    updateRouteById: async (routeId: string, payload: Partial<IRoutes.Model>): IRoutesGateway.UpdateRouteById.ReturnType => {
      try {
        const { data } = await requestService.request<IRoutes.ModelWithRelation>(
          `/routes/${routeId}`,
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
    createRoute: async (payload: IRoutes.RawModel): IRoutesGateway.CreateRoute.ReturnType => {
      try {
        const { data } = await requestService.request<IRoutes.ModelWithRelation>(
          'routes',
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
    deleteRouteById: async (routeId: number): IRoutesGateway.DeleteRouteById.ReturnType => {
      try {
        await requestService.request<IRoutes.ModelWithRelation>(
          `/routes/${routeId}`,
          'delete',
        );

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

export const routeGateway = createRouteGateway(createRequestService())