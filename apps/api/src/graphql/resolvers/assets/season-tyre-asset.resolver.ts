import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';

import { AbstractResolver } from '../abstract.resolver';
import { PrismaService } from '../../../app/services/prisma.service';
import { SeasonTyreAssetsArgs } from '../../args/assets/season-tyre-assets.args';
import { SeasonTyreAsset } from '../../models/assets/season-tyre-asset.model';
import { Season } from '../../models/season.model';
import { AssetsService } from '../../services/assets.service';

@Resolver(SeasonTyreAsset)
export class SeasonTyreAssetResolver extends AbstractResolver {
  private _assetsService: AssetsService;

  constructor(prismaService: PrismaService, assetsService: AssetsService) {
    super(prismaService);

    this._assetsService = assetsService;
  }

  @Query(() => [SeasonTyreAsset])
  async seasonTyreAssets(@Args() args: SeasonTyreAssetsArgs) {
    const season = await this._prismaService.season.findFirst({
      where: {
        slug: args.seasonSlug,
      },
      include: {
        series: true,
      },
    });
    if (!season) {
      throw new Error(`Season ${args.seasonSlug} not found.`);
    }

    return this._assetsService.getSeasonTyreAssets(season);
  }

  @ResolveField('season', () => Season)
  async season(@Parent() parent: SeasonTyreAsset) {
    return this._prismaService.season.findFirst({
      where: {
        id: parent.seasonId,
      },
    });
  }
}
