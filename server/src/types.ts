import { Document } from 'mongoose';

export interface MetadataUrls {
  website: string[];
  twitter: string[];
  chat: string[];
  message_board: string[];
  explorer: string[];
  reddit: string[];
  technical_doc: string[];
  source_code: string[];
  announcement: string[];
}

export interface Metadata {
  id: string;
  symbol: string;
  name: string;
  logo: string;
  metadataId?: number;
  slug?: string;
  description?: string | null;
  urls?: MetadataUrls;
}

export interface Market {
  id: string;
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  minTradeSize: number;
  precision: number;
  status: string;
  notice: string;
  createdAt: string;
  name: string;
}

export interface Summary {
  [x: string]: number;
  id: string;
  symbol: string;
  high: number;
  low: number;
  volume: number;
  quoteVolume: number;
  percentChange: number;
}

export interface Ticker {
  id: string;
  price: string;
}

export interface Count {
  name: string;
  count: number;
}

export interface MissingMarket {
  symbol: string;
  name: string;
}

export interface Pair {
  ask: string;
  bid: string;
  last_trade: string;
  pair: string;
  rolling_24_hour_volume: string;
  status: string;
  timestamp: number;
}

export interface Order extends Document {
  amount: string;
  total: string;
  symbol: string;
  email?: string;
  pin?: string;
  isPaid?: boolean;
  isPending?: boolean;
  isWithdrawn?: boolean;
  isCancelled?: boolean;
  wallet?: string;
  reference: string;
  timestamp: string;
}

export interface OrderParams {
  amount?: string;
  total?: string;
  symbol?: string;
  email?: string;
  pin?: string;
  isPaid?: boolean;
  isPending?: boolean;
  isWithdrawn?: boolean;
  isCancelled?: boolean;
  wallet?: string;
  reference?: string;
}

export interface UpdateOrderParams {
  email?: string;
  isPaid?: boolean;
  isPending?: boolean;
  isWithdrawn?: boolean;
  isCancelled?: boolean;
  wallet?: string;
  reference?: string;
}

export interface OrderQueue extends Document {
  orderId: string;
  timestamp: string;
}

export interface OrderQueueParams {
  orderId: string;
  transactionId?: string;
  isExecuted?: boolean;
  isFilled?: boolean;
}

export interface UpdateOrderQueueParams {
  orderId?: string;
  transactionId?: string;
  isExecuted?: boolean;
  isFilled?: boolean;
}

export declare abstract class DataSource {
  getAllMarkets(): Market[];
  getMarket(id: string): Market;
  getTicker(id: string): Ticker;
  getPair(pair: string): Pair;
  getAllTickers(): Ticker[];
  getSummary(id: string): Summary;
  getCoin(id: string): Metadata;
  getOrders(): Order[];
  getOrder(id: string): Order;
  createOrder(amount: string, total: string, symbol: string): Order;
  updateOrder(id: string, input: OrderParams): Order;
  getAll(): Metadata[];
  missingData(): Metadata[];
}

export type DataSources = {
  [name: string]: DataSource;
};
