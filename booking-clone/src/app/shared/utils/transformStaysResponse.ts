import { IStayDestinationsResponse } from '@shared/interfaces/stays';
import { IStayReviewResponse } from '@shared/interfaces/stays';
import { IStayDetailsDataResponse } from '@shared/interfaces/stays';
import { IStayResponse } from '@shared/interfaces/stays';
import { IReview } from '@shared/models/shared';
import { IStaysDestination } from '@shared/models/stays';
import { IStay } from '@shared/models/stays';
import { IStayDetails } from '@shared/models/stays';

import { getShortDateFormat } from './dateParser';

export const getTransformedStayData = ({
  property,
  accessibilityLabel,
}: IStayResponse): IStay => {
  const imgUrlArr = property.photoUrls[0].split('/');
  const transImgResolution = `${imgUrlArr.slice(0, 6).join('/')}/square330/${imgUrlArr.slice(7).join('/')}`;

  const stayData = {
    id: property.id,
    photo: transImgResolution,
    location: property.wishlistName,
    label: accessibilityLabel,
    name: property.name,
    currency: property.priceBreakdown.grossPrice.currency,
    rating: Number((property.reviewScore / 2).toFixed(1)),
    price: Number(property.priceBreakdown.grossPrice.value.toFixed(2)),
    reviewCount: property.reviewCount,
    latitude: property.latitude,
    longitude: property.longitude,
    checkInDate: property.checkinDate,
    checkOutDate: property.checkoutDate,
  };
  return stayData;
};

export const getTransformedStaysDestination = (
  destination: IStayDestinationsResponse
): IStaysDestination => {
  const locationData = {
    destId: destination.dest_id,
    searchType: destination.dest_type,
    location: destination.label,
  };
  return locationData;
};

export const getTransformedStayDetails = (
  stay: IStayDetailsDataResponse
): IStayDetails => {
  const nightsCount = Math.floor(
    Number(Date.parse(stay.departure_date) - Date.parse(stay.arrival_date)) /
      1000 /
      60 /
      60 /
      24
  );

  const stayDetailsData = {
    id: stay.hotel_id,
    photos: stay.rooms[stay.block[0].room_id].photos.map((item) => ({
      lg: item.url_max1280,
      sm: item.url_square180,
    })),
    location: stay.address,
    price: Number(
      (stay.product_price_breakdown.gross_amount.value * nightsCount).toFixed(2)
    ),
    currency: stay.product_price_breakdown.net_amount.currency,
    reviews: stay.review_nr,
    description: stay.rooms[stay.block[0].room_id].description,
    arrival_date: getShortDateFormat(stay.arrival_date),
    departure_date: getShortDateFormat(stay.departure_date),
    city: stay.city,
    facilities: stay.facilities_block.facilities.map((fac) => fac.name),
    nights: nightsCount,
    name: stay.hotel_name,
    cancellation: {
      type: stay.block[0].paymentterms.cancellation.type_translation,
      before: stay.block[0].paymentterms.cancellation.info.date_before,
    },
    rating:
      stay.breakfast_review_score.review_count === 0
        ? null
        : Number((stay.breakfast_review_score.rating / 2).toFixed(1)),
    specs: {
      square: stay.block[0].room_surface_in_m2,
      bedrooms: stay.block[0].number_of_bedrooms,
      bathrooms: stay.block[0].number_of_bathrooms,
    },
  };
  return stayDetailsData;
};

export const getTransformedStayReview = (
  review: IStayReviewResponse
): IReview => {
  const transformedReview = {
    photo: review.author.avatar ?? null,
    rating: Number(review.average_score.toFixed(1)),
    review: review.pros,
    reviewer: review.author.name,
    date: getShortDateFormat(review.date),
  };

  return transformedReview;
};
