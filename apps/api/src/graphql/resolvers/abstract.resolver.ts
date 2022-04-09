/* eslint-disable @typescript-eslint/no-inferrable-types */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../app/services/prisma.service';
import { AllArgs } from '../args/all.args';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type KeyValueMap = { [key: string]: any };

type ExactFilterField =
  | string
  | {
      filterField: string;
      parentModel: string;
      model: string;
      modelField: string;
      modelFieldParent?: string;
      modelInclude?: { [key: string]: boolean };
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

    for (const field of allowedExactFilterFields) {
      if (typeof field !== 'string') {
        const entity = await this._prismaService[field.model].findFirst({
          where: {
            id: args.filter[field.filterField],
          },
          include: field.modelInclude,
        });
        if (!entity) {
          continue;
        }

        if (!where[field.parentModel]) {
          where[field.parentModel] = {};
        }
        if (!where[field.parentModel]?.[field.modelField]) {
          where[field.parentModel][field.modelField] = {};
        }
        if (!where[field.parentModel]?.[field.modelField]?.in) {
          where[field.parentModel][field.modelField].in = [];
        }

        where[field.parentModel][field.modelField].in.push(
          field.modelFieldParent ? entity[field.modelFieldParent][field.modelField] : entity[field.modelField]
        );

        continue;
      }

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
