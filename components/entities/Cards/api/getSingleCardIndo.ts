import { IResponse } from '@/components/shared/types/types';
import { axiosInstance } from '@/components/shared/api/axiosInstance';
import { config } from '@/components/shared/api/config/config';

async function getSingleCardsInfo(id: string) {
  const apiUrl = config.baseUrl + '/' + id;
  try {
    const res = await axiosInstance.get<IResponse>(apiUrl);
    const resOK = res.status >= 200 && res.status < 300;
    if (resOK) {
      return res.data;
    }
    throw new Error();
  } catch (error) {
    return error as Error;
  }
}

export default getSingleCardsInfo;
