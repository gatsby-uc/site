import fetch from 'node-fetch';

export async function getMultiPackageInfo(packages) {
  const url = `https://api.npms.io/v2/package/mget`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(packages),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(`${response.status} | ${json.code} | ${json.message}`);
  }

  return json
}
