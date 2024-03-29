import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ICarsSearchParams } from '@shared/cars/interfaces/params';
import { ICar } from '@shared/cars/models/car';

const actionSource = '[Cars]';

export const FetchCars = createAction(
  `${actionSource} Fetch`,
  props<{
    searchParams: ICarsSearchParams;
  }>()
);

export const FetchCarsSuccess = createAction(
  `${actionSource} Fetch Success`,
  props<{ cars: ICar[] }>()
);

export const FetchCarsFailed = createAction(
  `${actionSource} Fetch Failed`,
  props<{ error: HttpErrorResponse }>()
);