/* eslint-disable @typescript-eslint/no-inferrable-types */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../app/services/prisma.service';
import { AllArgs } from '../args/all.args';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type KeyValueMap = { [key: string]: any };

type ExactFilterField = {
  filterField: string;
  model?: string;
  sourceField?: string;
  sourceModel?: string; // if the filter links to another entity, which one is it? Ex. event-session.resolver.ts
  sourceModelParent?: string;
  isModelManyToMany?: boolean;
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
  async getPrismaArgs<T extends AllArgs>(
    args: T,
    skipPagination: boolean = false,
    queryFilterFields: string[] = [],
    allowedExactFilterFields: ExactFilterField[] = []
  ) {
    const skip = !skipPagination && args.perPage ? (args.page ?? 0) * args.perPage : undefined;
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

    if (args.filter?.q && queryFilterFields.length) {
      const query = args.filter?.q;
      const orWhere: KeyValueMap[] = [];

      for (const field of queryFilterFields) {
        // TODO: figure out a better, recursive way to do this
        const fieldSplit = field.split('.');
        if (fieldSplit.length > 3) {
          new Error(`You are only allowed to have up to 3 fields.`);
        }

        const fieldParent = fieldSplit[0];
        if (!fieldParent) {
          new Error(`The parent field can not be empty.`);
        }

        if (fieldSplit.length === 1) {
          orWhere.push({
            [fieldParent]: {
              contains: query,
              mode: 'insensitive',
            },
          });

          continue;
        }

        const fieldChild = fieldSplit[1];
        if (!fieldChild) {
          new Error(`The child field can not be empty.`);
        }

        if (fieldSplit.length === 2) {
          orWhere.push({
            [fieldParent]: {
              [fieldChild]: {
                contains: query,
                mode: 'insensitive',
              },
            },
          });

          continue;
        }

        const fieldGrandChild = fieldSplit[2];
        if (!fieldGrandChild) {
          new Error(`The grand child field can not be empty.`);
        }

        orWhere.push({
          [fieldParent]: {
            [fieldChild]: {
              [fieldGrandChild]: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
        });
      }

      where['OR'] = orWhere;
    }

    if (args.filter && allowedExactFilterFields?.length) {
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
            include: field.sourceModelParent
              ? {
                  [field.sourceModelParent]: true,
                }
              : undefined,
          });
          if (!model) {
            continue;
          }

          whereField = field.sourceField;
          filterFieldValue = field.sourceModelParent ? model[field.sourceModelParent][whereField] : model[whereField];
        }

        let exactFilterFieldWhere = {};
        if (field.isModelManyToMany && field.model) {
          exactFilterFieldWhere = {
            [field.model]: {
              every: {
                [whereField]: filterFieldValue,
              },
            },
          };
        } else if (field.model) {
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

      if (andWhere.length) {
        where['AND'] = andWhere;
      }
    }

    return {
      skip,
      take,
      orderBy,
      where: Object.keys(where).length ? where : undefined,
    };
  }
}
