/* eslint-disable @typescript-eslint/no-inferrable-types */

import { AllArgs } from '../args/all.args';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type KeyValue = { [key: string]: any };

export abstract class AbstractResolver {
  /**
   * @param args
   * @param skipPagination
   * @param queryFilterFields When passing the args.filter.q parameter, which fields should it search?
   * @param allowedExactFilterFields Which exact filters from args.filters should we choose and filter by the exact match?
   * @returns array
   */
  getAllArgs<T extends AllArgs>(
    args: T,
    skipPagination: boolean = false,
    queryFilterFields: string[] = [],
    allowedExactFilterFields: string[] = []
  ) {
    const skip = !skipPagination && args.perPage ? args.page * args.perPage : undefined;
    const take = !skipPagination && args.perPage ? args.perPage : undefined;
    const orderBy =
      args.sortField && args.sortOrder
        ? {
            [args.sortField]: args.sortOrder.toLowerCase(),
          }
        : undefined;

    const where: KeyValue = {};
    if (args.filter?.ids) {
      where['id'] = { in: args.filter.ids };
    } else if (args.filter?.id) {
      where['id'] = args.filter.id;
    }

    if (queryFilterFields.length && args.filter?.q) {
      const query = args.filter?.q;
      const orWhere: KeyValue[] = [];

      for (const field of queryFilterFields) {
        if (field.includes('.')) {
          const fieldSplit = field.split('.');
          if (fieldSplit.length !== 2) {
            new Error(`You are only allowed to to have 2 fields.`);
          }

          const fieldParent = fieldSplit[0];
          const fieldChild = fieldSplit[1];
          if (!fieldParent || !fieldChild) {
            new Error(`The parent or child field is empty.`);
          }

          orWhere.push({
            [fieldParent]: {
              [fieldChild]: {
                contains: query,
                mode: 'insensitive',
              },
            },
          });
        } else {
          orWhere.push({
            [field]: {
              contains: query,
              mode: 'insensitive',
            },
          });
        }
      }

      where['OR'] = orWhere;
    }

    for (const field of allowedExactFilterFields) {
      if (!args.filter[field]) {
        continue;
      }

      where[field] = args.filter[field];
    }

    return {
      skip,
      take,
      orderBy,
      where: Object.keys(where) ? where : undefined,
    };
  }
}
