import { IFlight } from '@shared/models/flights';

export interface IFlightsSearchParams {
  departureDate: string;
  fromId: string;
  toId: string;
  page: number;
}

export interface IFlightsSearchFilters {
  adults: number | null;
  sortBy: string | null;
  cabinClass: string | null;
}

export interface IFlightsInfoData {
  flights: IFlight[];
  totalCount: number;
}
