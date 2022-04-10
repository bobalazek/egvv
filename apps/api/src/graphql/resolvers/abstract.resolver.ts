/* eslint-disable @typescript-eslint/no-inferrable-types */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../app/services/prisma.service';
import { AllArgs } from '../args/all.args';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type KeyValueMap = { [key: string]: any };

type ExactFilterField = {
  filterField: string;
  model?: string;
  sourceModel?: string; // if the filter links to another entity, which one is it? Ex. event-session.resolver.ts
  sourceField?: string;
};

@Injectable()
export class AbstractResolver {
  protected _prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this._prismaService = prismaService;
  }

  /**
   * @param args
   * @param skipPagination
   * @param queryFilterFields When passing the args.filter.q parameter, which fields should it search?
   * @param allowedExactFilterFields Which exact filters from args.filters should we choose and filter by the exact match?
   * @returns array
   */
  async getAllArgs<T extends AllArgs>(
    args: T,
    skipPagination: boolean = false,
    queryFilterFields: string[] = [],
    allowedExactFilterFields: ExactFilterField[] = []
  ) {
    const skip = !skipPagination && args.perPage ? args.page * args.perPage : undefined;
    const take = !skipPagination && args.perPage ? args.perPage : undefined;
    const orderBy =
      args.sortField && args.sortOrder
        ? {
            [args.sortField]: args.sortOrder.toLowerCase(),
          }
        : undefined;

    const where: KeyValueMap = {};
    if (args.filter?.ids) {
      where['id'] = { in: args.filter.ids };
    } else if (args.filter?.id) {
      where['id'] = args.filter.id;
    }

    if (queryFilterFields.length && args.filter?.q) {
      const query = args.filter?.q;
      const orWhere: KeyValueMap[] = [];

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

    if (allowedExactFilterFields?.length) {
      const andWhere: KeyValueMap[] = [];

      for (const field of allowedExactFilterFields) {
        let filterFieldValue = args.filter[field.filterField];
        if (!filterFieldValue) {
          continue;
        }

        let whereField = field.filterField;
        if (field.sourceField && field.sourceModel) {
          const model = await this._prismaService[field.sourceModel].findFirst({
            where: {
              id: filterFieldValue,
            },
          });
          if (!model) {
            continue;
          }

          whereField = field.sourceField;
          filterFieldValue = model[whereField];
        }

        let exactFilterFieldWhere = {};
        if (field.model) {
          exactFilterFieldWhere = {
            [field.model]: {
              [whereField]: filterFieldValue,
            },
          };
        } else {
          exactFilterFieldWhere = {
            [whereField]: filterFieldValue,
          };
        }

        andWhere.push(exactFilterFieldWhere);
      }

      where['AND'] = andWhere;
    }

    return {
      skip,
      take,
      orderBy,
      where: Object.keys(where) ? where : undefined,
    };
  }
}
