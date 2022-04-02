import { AllArgs } from '../args/all';

export abstract class AbstractResolver {
  getAllArgs(args: AllArgs) {
    const skip = args.perPage ? args.page * args.perPage : undefined;
    const take = args.perPage ? args.perPage : undefined;
    const orderBy =
      args.sortField && args.sortOrder
        ? {
            [args.sortField]: args.sortOrder.toLowerCase(),
          }
        : undefined;

    return {
      skip,
      take,
      orderBy,
    };
  }
}
