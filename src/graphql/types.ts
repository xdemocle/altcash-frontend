export type MetadataUrls = {
  website: string;
  twitter: string;
  chat: string;
  message_board: string;
  explorer: string;
  reddit: string;
  technical_doc: string;
  source_code: string;
  announcement: string;
};

export type Metadata = {
  id: string;
  metadataId: number;
  name: string;
  symbol: string;
  slug: string;
  description: string;
  logo: string;
  urls: MetadataUrls;
};

export interface Coin {
  minTradeSize: number;
  id: string;
  name: string;
  status: string;
  symbol: string;
}

export interface Ticker {
  askRate: number;
  bidRate: number;
  id: string;
  lastTradeRate: number;
}
