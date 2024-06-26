import { IAttractionDataDetailsResponse } from '@shared/interfaces/attractions';
import { IAttractionResponse } from '@shared/interfaces/attractions';
import { IAttrDestinationResponse } from '@shared/interfaces/attractions';
import { IAttraction } from '@shared/models/attractions';
import { IAttractionDetails } from '@shared/models/attractions';
import { IAttractionsDestination } from '@shared/models/attractions';

import { getShortDateFormat } from './dateParser';

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
    rating: attr.reviewsStats?.combinedNumericStats?.average
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
    cancellation: attr.cancellationPolicy.hasFreeCancellation
      ? 'Free cancelation'
      : 'Not free cancelation',
    rating: attr.reviewsStats.combinedNumericStats.average,
    reviews: attr.reviews.reviews.map((review) => ({
      photo: review.user?.avatar ?? null,
      rating: Number(review.numericRating.toFixed(1)),
      review: review.content ?? 'no review',
      reviewer: review.user?.name ?? 'Unknown',
      date: getShortDateFormat(new Date(review.epochMs).toString()),
    })),
    accessibility: attr.accessibility,
  };
  return attrDetailsData;
};
