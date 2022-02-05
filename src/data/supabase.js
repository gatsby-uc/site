import { createClient } from '@supabase/supabase-js';

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

export async function logPackageInfo(supabase, packageInfo) {
  const { data, error } = await supabase
    .from('npms-fetch-log')
    .insert([{ body: packageInfo }], { returning: 'minimal' });

  if (error) {
    throw new Error(error);
  }

  return data;
}
