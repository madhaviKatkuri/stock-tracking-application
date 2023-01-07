import { CompanyNames } from "./companydata";
import { Quote } from "./quote";

export interface Stock {
    description: string;
    symbol: string;
    d: number;
    c: number;
    o: number;
    h: number;
}
export interface StockInformation {
    description: string;
    symbol: string;
}
export interface StockInfo {
    companyNames: CompanyNames;
    quotes: Quote;
}  
