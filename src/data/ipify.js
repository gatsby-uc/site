import fetch from 'node-fetch';

export async function getIp() {
  const response = await fetch('https://api64.ipify.org/?format=json');
  const json = await response.json();

  if (!response.ok) {
    throw new Error(`${response.status} | ${json.code} | ${json.message}`);
  }

  return json.ip;
}
