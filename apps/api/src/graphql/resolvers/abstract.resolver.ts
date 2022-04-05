import { AllArgs } from '../args/all.args';

export abstract class AbstractResolver {
  getAllArgs<T extends AllArgs>(args: T, queryFields: string[] = []) {
    const skip = args.perPage ? args.page * args.perPage : undefined;
    const take = args.perPage ? args.perPage : undefined;
    const orderBy =
      args.sortField && args.sortOrder
        ? {
            [args.sortField]: args.sortOrder.toLowerCase(),
          }
        : undefined;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: { [key: string]: any } = {};
    if (args.filter?.ids) {
      where['id'] = { in: args.filter.ids };
    } else if (args.filter?.id) {
      where['id'] = args.filter.id;
    }
    if (queryFields.length && args.filter?.q) {
      const query = args.filter?.q;
      for (const field of queryFields) {
        where[field] = {
          contains: query,
          mode: 'insensitive',
        };
      }
    }

    return {
      skip,
      take,
      orderBy,
      where: Object.keys(where) ? where : undefined,
    };
  }
}
