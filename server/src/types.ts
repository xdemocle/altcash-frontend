export interface MetadataUrls {
  website: string[]
  twitter: string[]
  chat: string[]
  message_board: string[]
  explorer: string[]
  reddit: string[]
  technical_doc: string[]
  source_code: string[]
  announcement: string[]
}

export interface Metadata {
  id: string
  symbol: string
  name: string
  logo: string
  bittrexId?: string | number
  slug?: string
  description?: string | null
  urls?: MetadataUrls
}

export interface Coin {
  id: string
  symbol: string
  baseCurrencySymbol: string
  quoteCurrencySymbol: string
  minTradeSize: number
  precision: number
  status: string
  notice: string
  createdAt: string
  name: string
}

export interface Summary {
  id: string
  symbol: string
  high: number
  low: number
  volume: number
  quoteVolume: number
  percentChange: number
  updatedAt: string
}

export interface Ticker {
  id: string
  symbol: string
  lastTradeRate: number
  bidRate: number
  askRate: number
}

export interface Count {
  name: string
  count: number
}

export interface MissingMarket {
  symbol: string
  name: string
}

export interface Pair {
  ask: string
  bid: string
  last_trade: string
  pair: string
  rolling_24_hour_volume: string
  status: string
  timestamp: number
}

export declare abstract class DataSource {
  getAllMarkets(): Coin[]
  getMarket(id: string): Coin
  getTicker(id: string): Ticker
  getPair(pair: string): Pair
  getAllTickers(): Ticker[]
  getAllSummaries(): Summary[]
  getSummary(id: string): Summary
  getCoin(id: string): Metadata
  getAll(): Metadata[]
  missingData(): Metadata[]
}

export type DataSources = {
  [name: string]: DataSource
}
