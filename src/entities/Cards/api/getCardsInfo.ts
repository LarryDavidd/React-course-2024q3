import { config } from '@shared/api/config/config';

async function getCardsInfo(queryArgs: string[] = [], limit = 10, offset = 1) {
  if (offset < 1) offset = 1;
  const baseUrl = config.baseUrl + '/?' + `count=${limit}` + '&' + `page=${offset}`;
  const apiUrl = queryArgs.reduce((accum, value) => accum + '&' + value, baseUrl);
  const res = await fetch(apiUrl);
  if (!res.ok) {
    return res.status;
  }
  return res.json();
}

export default getCardsInfo;
