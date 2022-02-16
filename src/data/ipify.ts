import fetch from 'node-fetch';

export async function getIp() {
  const response = await fetch('https://api64.ipify.org/?format=json');
  
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  
  const json = await response.json() as { ip: string };

  return json.ip;
}
