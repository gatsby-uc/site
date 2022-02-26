import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import {
  serverClient as supabase,
  getPackages,
  upsertNpmsData,
  NpmsDataRow,
  PackageScoreRow,
  upsertPackageScores,
  updatePackageLastAnalyzedAt,
  PackageLastAnalyzedAt,
} from '../../data/supabase';
import { npmsio } from '../../data/npmsio';

export default async function handler(req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) {
  if (req.method !== `POST`) {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).send(ReasonPhrases.METHOD_NOT_ALLOWED);
  }
  try {
    const timestamp = new Date();

    const packages = await getPackages(supabase);
    const packageNames = packages.map(({ name }) => name);

    const packageInfo = await npmsio.package.multiPackageInfo(packageNames);

    const packageEntries = Object.entries(packageInfo);

    const formattedPackageInfo: NpmsDataRow[] = packageEntries.map(([packageName, info]) => ({
      package: packageName,
      data: JSON.stringify(info),
      analyzed_at: info.analyzedAt,
      last_checked_at: timestamp.toISOString(),
    }));

    await upsertNpmsData(supabase, ...formattedPackageInfo);

    const formattedScoreInfo: PackageScoreRow[] = packageEntries.map(
      ([packageName, { analyzedAt, score }]) => ({
        package: packageName,
        analyzed_at: analyzedAt,
        final: score?.final,
        quality: score?.detail?.quality,
        popularity: score?.detail?.popularity,
        maintenance: score?.detail?.maintenance,
      })
    );

    await upsertPackageScores(supabase, ...formattedScoreInfo);

    const packagesUpdated: Promise<PackageLastAnalyzedAt>[] = packageEntries.map(
      ([packageName, { analyzedAt }]) =>
        updatePackageLastAnalyzedAt(supabase, {
          name: packageName,
          last_analyzed_at: analyzedAt,
        })
    );

    await Promise.all(packagesUpdated);

    res.status(StatusCodes.OK).json({
      message: `Successfully fetched package data.`,
    });
  } catch (e) {
    console.error(e);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: `${ReasonPhrases.INTERNAL_SERVER_ERROR}`,
    });
  }
}
