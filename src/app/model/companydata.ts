export interface CompanyData {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}
export interface CompanyNames {
  count: number;
  result: CompanyData[];
}
