import { IResult } from '@shared/types/types';
import { axiosInstance } from '@shared/api/axiosInstance';
import { config } from '@shared/api/config/config';

async function getCardsInfo(queryArgs: string[] = [], offset = 1, limit = 10) {
  if (offset < 1) offset = 1;
  const baseUrl = config.baseUrl + '/?' + `count=${limit}` + '&' + `page=${offset}`;
  const apiUrl = queryArgs.reduce((accum, value) => accum + '&' + value, baseUrl);
  try {
    const res = await axiosInstance.get<IResult>(apiUrl);
    const resOK = res.status >= 200 && res.status < 300;
    if (resOK) {
      return res.data;
    }
    throw new Error();
  } catch (error) {
    return error as Error;
  }
}

export default getCardsInfo;
