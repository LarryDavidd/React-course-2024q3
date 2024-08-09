import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { config } from '@/components/shared/api/config/config';
import { reqestMockData } from '@/__mocks__';
import getSingleCardsInfo from '@/components/entities/Cards/api/getSingleCardIndo';

describe('getSingleCardsInfo', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should return data when the response is successful', async () => {
    const id = '1';
    const apiUrl = `${config.baseUrl}/${id}`;

    mock.onGet(apiUrl).reply(200, reqestMockData.results[0]);

    const result = await getSingleCardsInfo(id);
    expect(result).toEqual(reqestMockData.results[0]);
  });

  it('should return error when the response is not successful', async () => {
    const id = 'error';
    const apiUrl = `${config.baseUrl}/${id}`;

    mock.onGet(apiUrl).reply(500);

    const result = await getSingleCardsInfo(id);
    expect(result).toBeInstanceOf(Error);
  });
});
