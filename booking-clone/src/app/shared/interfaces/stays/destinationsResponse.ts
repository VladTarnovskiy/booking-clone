export interface IStaysDestinationsResponse {
  status: boolean;
  message: string;
  timestamp: number;
  data: IStayDestinationsResponse[];
}

export interface IStayDestinationsResponse {
  dest_type: string;
  cc1: string;
  city_name: string;
  label: string;
  longitude: number;
  latitude: number;
  type: string;
  region: string;
  city_ufi: number;
  name: string;
  roundtrip: string;
  country: string;
  image_url: string;
  dest_id: string;
  nr_hotels: number;
  lc: string;
  hotels: number;
}
