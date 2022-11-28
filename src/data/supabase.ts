import { createClient, PostgrestError, SupabaseClient } from '@supabase/supabase-js';
import { getIp } from './ipify';

const { GATSBY_CLOUD = false, BRANCH = null } = process.env;

const SUPABASE_API_URL = process.env.SUPABASE_API_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

if (SUPABASE_API_URL == undefined) {
  throw new Error("SUPABASE_API_URL required")
}

if (SUPABASE_ANON_KEY == undefined) {
  throw new Error("SUPABASE_ANON_KEY required")
}

if (SUPABASE_SECRET_KEY == undefined) {
  throw new Error("SUPABASE_SECRET_KEY required")
}

export const publicClient = createClient(
  SUPABASE_API_URL,
  SUPABASE_ANON_KEY
);

export const serverClient = createClient(
  SUPABASE_API_URL,
  SUPABASE_SECRET_KEY
);

type Package = {
  name: string;
};

export async function getPackages(supabase: SupabaseClient) {
  const { data: packages, error } = await supabase.from('packages').select('name')

  if (error) {
    throw new Error(error.message);
  }

  return packages;
}

export type NpmsDataRow = {
  analyzed_at: string;
  package: string;
  data: string;
  last_checked_at: string;
};

export type PackageScoreRow = {
  package: string;
  analyzed_at: string;
  final: number;
  quality: number;
  popularity: number;
  maintenance: number;
};

export async function upsertNpmsData(supabase: SupabaseClient, ...rows: NpmsDataRow[]) {
  const { data, error } = await supabase
    .from('npms-data-log')
    .upsert(rows);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function upsertPackageScores(supabase: SupabaseClient, ...rows: PackageScoreRow[]) {
  const { data, error } = await supabase
    .from('package-scores')
    .upsert(rows);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export type PackageLastAnalyzedAt = {
  name: string;
  last_analyzed_at: string;
};

export async function updatePackageLastAnalyzedAt(supabase, packageData: PackageLastAnalyzedAt) {
  const { name, last_analyzed_at } = packageData;
  const { data, error } = await supabase
    .from('packages')
    .update({ last_analyzed_at })
    .match({ name });

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
