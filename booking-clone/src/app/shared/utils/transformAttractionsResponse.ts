import { IAttractionDataDetailsResponse } from '@shared/interfaces/attractions/attractionDetailsResponse';
import { IAttractionResponse } from '@shared/interfaces/attractions/attractionsResponse';
import { IAttrDestinationResponse } from '@shared/interfaces/attractions/destinationsResponse';
import { IAttraction } from '@shared/models/attractions/attraction';
import { IAttractionDetails } from '@shared/models/attractions/attractionDetails';
import { IAttractionsDestination } from '@shared/models/attractions/destination';

export const getTransformedAttrDestination = (
  destination: IAttrDestinationResponse
): IAttractionsDestination => {
  const locationData = {
    attractionId: destination.id,
    location: destination.cityName + ', ' + destination.country,
  };
  return locationData;
};

export const getTransformedAttractionData = (
  attr: IAttractionResponse
): IAttraction => {
  const attractionData = {
    id: attr.id,
    photo: attr.primaryPhoto.small,
    location: attr.ufiDetails.bCityName,
    label: attr.shortDescription,
    name: attr.name,
    currency: attr.representativePrice.currency,
    rating: attr.reviewsStats
      ? Number((attr.reviewsStats.combinedNumericStats.average / 2).toFixed(1))
      : null,
    price: Number(attr.representativePrice.chargeAmount.toFixed(2)),
    reviewCount: attr.reviewsStats ? attr.reviewsStats.allReviewsCount : 0,
    slug: attr.slug,
  };
  return attractionData;
};

export const getTransformedAttractionDetails = (
  attr: IAttractionDataDetailsResponse
): IAttractionDetails => {
  let location = 'Unknown';
  if (attr.addresses.arrival) {
    location =
      attr.addresses.arrival[0].address + ', ' + attr.addresses.arrival[0].city;
  } else if (attr.addresses.meeting) {
    location =
      attr.addresses.meeting[0].address + ', ' + attr.addresses.meeting[0].city;
  }
  const attrDetailsData = {
    id: attr.id,
    photos: attr.photos.map((item) => ({
      lg: item.medium,
      sm: item.small,
    })),
    location: location,
    price: Number(attr.representativePrice.chargeAmount.toFixed(2)),
    currency: attr.representativePrice.currency,
    reviewsCount: attr.reviewsStats.allReviewsCount,
    description: attr.description,
    city: attr.ufiDetails.bCityName,
    includes: attr.whatsIncluded,
    name: attr.name,
    // cancellation: {
    //   type: attr.cancellationPolicy.hasFreeCancellation,
    //   before: stay.block[0].paymentterms.cancellation.info.date_before,
    // },
    rating: attr.reviewsStats.combinedNumericStats.average,
    reviews: attr.reviews.reviews.map((review) => ({
      photo: review.user?.avatar ?? null,
      rating: Number(review.numericRating.toFixed(1)),
      review: review.content ?? '',
      reviewer: review.user?.name ?? null,
      date: review.epochMs,
    })),
    // specs: {
    //   square: stay.block[0].room_surface_in_m2,
    //   bedrooms: stay.block[0].number_of_bedrooms,
    //   bathrooms: stay.block[0].number_of_bathrooms,
    // },
  };
  return attrDetailsData;
};