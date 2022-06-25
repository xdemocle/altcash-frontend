import { RESTDataSource } from 'apollo-datasource-rest';
import { Pair } from '../types';

class MybitxAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.mybitx.com/api/1';
  }

  async getPair(pair: string): Promise<Pair> {
    const response = await this.get(`ticker?pair=${pair}`);

    return response;
  }
}

export default MybitxAPI;
