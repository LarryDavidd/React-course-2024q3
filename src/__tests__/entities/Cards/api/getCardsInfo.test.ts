import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { config } from '@shared/api/config/config';
import { reqestMockData } from '@/__mocks__';
import { getCardsInfo } from '@/entities/Cards';

describe('getCardsInfo', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should return data when the response is successful', async () => {
    const queryArgs = ['name=Rick'];
    const offset = 1;
    const limit = 10;
    const apiUrl = `${config.baseUrl}/?count=${limit}&page=${offset}&name=test`;

    mock.onGet(apiUrl).reply(200, reqestMockData);

    const result = await getCardsInfo(queryArgs, offset, limit);
    expect(result).toEqual(reqestMockData);
  });
});
