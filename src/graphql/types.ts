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

export interface Market {
  id: string;
  symbol: string;
  name: string;
  status: string;
  quotePrecision: number;
  minTradeSize: number;
  minNotional: number;
  stepSize: number;
}

export interface Ticker {
  id: string;
  price: string;
}

export interface Order {
  _id: string;
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
  orderReferences: string[];
  hasErrors: boolean;
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
  orderReferences?: string[];
  hasErrors?: boolean;
}
