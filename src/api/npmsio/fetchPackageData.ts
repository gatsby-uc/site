import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import {
  serverClient as supabase,
  getPackages,
  logPackageInfo,
  generateSourceData,
} from '../../data/supabase';
import { getMultiPackageInfo } from '../../data/npmsio';

export default async function handler(req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) {
  if (req.method !== `POST`) {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).send(ReasonPhrases.METHOD_NOT_ALLOWED);
  }
  try {
    const packages = await getPackages(supabase);

    const packageNames = packages.map(({ name }) => name);

    const packageInfo = await getMultiPackageInfo(packageNames);

    await logPackageInfo(supabase, { body: packageInfo, source: await generateSourceData(req) });

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
