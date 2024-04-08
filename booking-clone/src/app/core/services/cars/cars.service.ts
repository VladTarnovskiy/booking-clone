import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICarDetailsResponse } from '@shared/interfaces/cars/carDetailsResponse';
import { ISearchCarsResponse } from '@shared/interfaces/cars/carsResponse';
import { ICarsDestinationResponse } from '@shared/interfaces/cars/destinationsResponse';
import {
  ICarDetailsParams,
  ICarsSearchParams,
} from '@shared/interfaces/cars/params';
import { ICarReviewsResponse } from '@shared/interfaces/cars/reviewsResponse';
import { ICar } from '@shared/models/cars/car';
import { ICarDetails } from '@shared/models/cars/carDetails';
import { ICarsDestination } from '@shared/models/cars/destination';
import { ICarReview } from '@shared/models/cars/review';
import {
  getTransformedCarData,
  getTransformedCarDestinations,
  getTransformedCarDetails,
  getTransformedCarReview,
} from '@shared/utils/transformCarsResponse';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private destinationURL =
    'https://booking-com15.p.rapidapi.com/api/v1/cars/searchDestination';
  private searchCarsURL =
    'https://booking-com15.p.rapidapi.com/api/v1/cars/searchCarRentals';
  private carDetailsURL =
    'https://booking-com15.p.rapidapi.com/api/v1/cars/vehicleDetails';
  private carReviewsURL =
    'https://booking-com15.p.rapidapi.com/api/v1/cars/vehicleSupplierReview';

  constructor(private http: HttpClient) {}

  getDestinations({
    query,
  }: {
    query: string;
  }): Observable<ICarsDestination[]> {
    const options = {
      params: new HttpParams().set('query', query),
    };
    return this.http
      .get<ICarsDestinationResponse>(this.destinationURL, options)
      .pipe(
        map((resp) => {
          if (resp.data) {
            const transData = resp.data.map((location) => {
              const coordinatesData = getTransformedCarDestinations(location);
              return coordinatesData;
            });
            return transData;
          } else {
            return [];
          }
        })
      );
  }

  getCars(query: ICarsSearchParams): Observable<ICar[]> {
    const { fromDate, fromTime, latitude, longitude, untilDate, untilTime } =
      query;
    const options = {
      params: new HttpParams()
        .set('pick_up_latitude', latitude)
        .append('pick_up_longitude', longitude)
        .append('drop_off_latitude', latitude)
        .append('drop_off_longitude', longitude)
        .append('pick_up_date', fromDate)
        .append('drop_off_date', untilDate)
        .append('pick_up_time', fromTime)
        .append('drop_off_time', untilTime),
    };
    return this.http.get<ISearchCarsResponse>(this.searchCarsURL, options).pipe(
      map((resp) => {
        if (resp.data.search_results) {
          const transData = resp.data.search_results.map((car) => {
            const carData = getTransformedCarData(car, resp.data.search_key);
            return carData;
          });
          return transData;
        } else {
          return [];
        }
      })
    );
  }

  getCarDetails(query: ICarDetailsParams): Observable<ICarDetails | null> {
    const { searchKey, vehicleId } = query;
    const options = {
      params: new HttpParams()
        .set('search_key', searchKey)
        .append('vehicle_id', vehicleId),
    };
    return this.http.get<ICarDetailsResponse>(this.carDetailsURL, options).pipe(
      map((resp) => {
        if (resp.data) {
          const stayDetailsData = getTransformedCarDetails(resp);
          return stayDetailsData;
        } else {
          return null;
        }
      })
    );
  }

  getCarReviews(query: ICarDetailsParams): Observable<ICarReview[]> {
    const { searchKey, vehicleId } = query;
    const options = {
      params: new HttpParams()
        .set('search_key', searchKey)
        .append('vehicle_id', vehicleId),
    };

    return this.http.get<ICarReviewsResponse>(this.carReviewsURL, options).pipe(
      map((resp) => {
        if (resp.data) {
          const carReviewsData = resp.data.customerReviews.reviews.map(
            (review) => {
              const transformedReview = getTransformedCarReview(review);

              return transformedReview;
            }
          );
          return carReviewsData;
        } else {
          return [];
        }
      })
    );
  }
}
