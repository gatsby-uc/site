import { serverClient as supabase, getPackages, logPackageInfo, generateSourceData } from '../../data/supabase';
import { getMultiPackageInfo } from '../../data/npmsio';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export default async function handler(req, res) {
  if (req.method === `POST`) {
    // if (!Array.isArray(body)) {
    //   res.status(StatusCodes.BAD_REQUEST).json({
    //     error: `Expected an array of package names.`,
    //   });
    // }

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
  } else {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).send(ReasonPhrases.METHOD_NOT_ALLOWED);
  }
}
