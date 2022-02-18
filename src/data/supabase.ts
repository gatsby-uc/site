import { createClient, PostgrestError, SupabaseClient } from '@supabase/supabase-js';
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

type Package = {
  name: string;
};

export async function getPackages(supabase: SupabaseClient) {
  const { data: packages, error } = (await supabase.from('packages').select('name')) as {
    data: Package[];
    error: PostgrestError;
  };

  if (error) {
    throw new Error(error.message);
  }

  return packages;
}

export type NpmsDataRow = {
  analyzed_at: string;
  package: string;
  data: string;
}


export async function upsertNpmsData(
  supabase: SupabaseClient,
  ...rows: NpmsDataRow[]
) {
  const { data, error } = await supabase
    .from('npms-data-log')
    .upsert(rows, { returning: 'minimal' });

  if (error) {
    throw new Error(error.message);
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
