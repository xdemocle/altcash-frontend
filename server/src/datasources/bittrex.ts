import { RESTDataSource } from 'apollo-datasource-rest';
import { each, filter } from 'lodash';
import { Order } from '../types';

class BittrexAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.bittrex.com/v3/';
  }

  async getAllMarkets(): Promise<Record<string, string>> {
    let response = await this.get('markets');

    // Removing not needed markets
    response = filter(response, (coin) => {
      if (coin.tags.length) {
        if (coin.tags.indexOf('TOKENIZED_SECURITY') !== -1) {
          return false;
        }
      }

      return coin.quoteCurrencySymbol === 'BTC';
    });

    return response;
  }

  async getMarket(symbol: string): Promise<Record<string, string>> {
    const marketSymbol = `${symbol}-BTC`.toLowerCase();
    const response = await this.get(`markets/${marketSymbol}`);

    return response;
  }

  async getAllSummaries(): Promise<Record<string, string>> {
    let response = await this.get('markets/summaries');

    // Removing not needed markets
    response = filter(response, (coin) => {
      return coin.symbol.search('-BTC') !== -1;
    });

    each(response, (coin) => {
      coin.id = coin.symbol = coin.symbol.replace('-BTC', '');
    });

    return response;
  }

  async getSummary(symbol: string): Promise<Record<string, string>> {
    const marketSymbol = `${symbol}-BTC`.toLowerCase();

    return await this.get(`markets/${marketSymbol}/summary`);
  }

  async getAllTickers(): Promise<Record<string, string>> {
    let response = await this.get('markets/tickers');

    // Removing not needed markets
    response = filter(response, (coin) => {
      return coin.symbol.search('-BTC') !== -1;
    });

    each(response, (coin) => {
      coin.id = coin.symbol = coin.symbol.replace('-BTC', '');
    });

    return response;
  }

  async getTicker(symbol: string): Promise<Record<string, string>> {
    const marketSymbol = `${symbol}-BTC`.toLowerCase();

    return await this.get(`markets/${marketSymbol}/ticker`);
  }

  async ping(): Promise<Record<string, string>> {
    return await this.get('ping');
  }

  // TODO
  async postOrder(order: Order): Promise<Record<string, string>> {
    const exchangeOrder = {
      marketSymbol: order.symbol,
      direction: 'string',
      type: 'string',
      quantity: 'number (double)',
      ceiling: 'number (double)',
      limit: 'number (double)',
      timeInForce: 'string',
      clientOrderId: 'string (uuid)',
      useAwards: 'boolean'
    };

    // return await this.post('orders', exchangeOrder);
    return exchangeOrder;
  }

  // get baseURL() {
  //   if (this.context.env === 'development') {
  //     return 'https://movies-api-dev.example.com/'
  //   } else {
  //     return 'https://movies-api.example.com/'
  //   }
  // }
}

export default BittrexAPI;
