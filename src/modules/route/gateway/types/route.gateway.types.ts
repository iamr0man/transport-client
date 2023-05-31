import { Response } from '@/infra/api/request.types.ts';
import { IRoutes } from '@/modules/route/types/route.types.ts';

export namespace IRoutesGateway {
  export namespace GeIRoutes {
    export type ReturnType = Promise<Response<IRoutes.ModelWithRelation[]>>;
  }

  export namespace GetRouteById {
    export type ReturnType = Promise<Response<IRoutes.ModelWithRelation>>;
  }

  export namespace UpdateRouteById {
    export type ReturnType = Promise<Response<IRoutes.ModelWithRelation>>;
  }

  export namespace CreateRoute {
    export type ReturnType = Promise<Response<IRoutes.ModelWithRelation>>;
  }

  export namespace DeleteRouteById {
    export type ReturnType = Promise<Response<boolean>>;
  }
}
