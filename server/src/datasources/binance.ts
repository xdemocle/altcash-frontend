import { RESTDataSource } from 'apollo-datasource-rest';
import { each, filter } from 'lodash';
import { Order } from '../types';

class BinanceAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'https://api.binance.com/api/v3/';
  }

  async getAllMarkets(): Promise<Record<string, string>> {
    const response = await this.get('exchangeInfo');
    let symbols = response.symbols;

    // Removing not needed ma.'rkets
    symbols = filter(symbols, (market) => {
      return market.quoteAsset === 'BTC';
    });

    return symbols;
  }

  async getMarket(symbol: string): Promise<Record<string, string>> {
    const marketSymbol = `${symbol}BTC`.toUpperCase();
    const response = await this.get(`exchangeInfo?symbol=${marketSymbol}`);

    return response.symbols[0];
  }

  async getAllTickers(): Promise<Record<string, string>> {
    let response = await this.get('ticker/price');

    // Removing not needed markets
    response = filter(response, (coin) => {
      // This way we detect btcusdt and others ex. CHRBTC
      return coin.symbol.search('BTC') >= 3;
    });

    each(response, (coin) => {
      coin.id = coin.symbol = coin.symbol.replace('BTC', '');
    });

    return response;
  }

  async getTicker(symbol: string): Promise<Record<string, string>> {
    const marketSymbol = `${symbol}BTC`.toUpperCase();

    return await this.get(`ticker/price?symbol=${marketSymbol}`);
  }

  async getSummary(symbol: string): Promise<Record<string, string>> {
    const marketSymbol = `${symbol}BTC`.toUpperCase();

    return await this.get(`ticker/24hr?symbol=${marketSymbol}`);
  }

  async ping(): Promise<Record<string, string>> {
    return await this.get('ping');
  }

  async time(): Promise<Record<string, string>> {
    return await this.get('time');
  }

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

export default BinanceAPI;
