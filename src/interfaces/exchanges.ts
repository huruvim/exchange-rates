export interface GetExchangeRate {
  base: string;
  exchange_rates: { [value: string]: number };
  last_updated: number;
}

export interface RowsI {
  category: string;
  rate: number;
}