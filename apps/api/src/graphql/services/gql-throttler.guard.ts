import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  // For some reason it's also picking up the requests of the http/crud module,
  // so disable the check in that case
  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() === 'http') {
      return true;
    }

    return super.canActivate(context);
  }

  getRequestResponse(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext();
    return { req: ctx.req, res: ctx.res };
  }
}
