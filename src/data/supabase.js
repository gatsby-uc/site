import { createClient } from '@supabase/supabase-js';
import { getIp } from './ipify';

const { GATSBY_CLOUD = false, BRANCH = null } = process.env;

export const publicClient = createClient(
  process.env.SUPABASE_API_URL,
  process.env.SUPABASE_ANON_KEY
);

export const serverClient = createClient(
  process.env.SUPABASE_API_URL,
  process.env.SUPABASE_SECRET_KEY
);

export async function getPackages(supabase) {
  const { data: packages, error } = await supabase.from('packages').select('name');

  if (error) {
    throw new Error(error);
  }

  return packages;
}

export async function logPackageInfo(supabase, ...rows) {
  console.log(rows);
  const { data, error } = await supabase
    .from('npms-fetch-log')
    .insert(rows, { returning: 'minimal' });

  if (error) {
    throw new Error(error);
  }

  return data;
}

export async function generateSourceData(req) {
  const { ip, hostname } = req;
  const userAgent = req.get('user-agent');

  const data = {
    userAgent,
    clientIp: ip,
    hostname: hostname,
    serverIp: await getIp(),
    gitBranch: BRANCH ?? 'unknown',
    gatsbyCloud: GATSBY_CLOUD,
  };

  return data;
}
