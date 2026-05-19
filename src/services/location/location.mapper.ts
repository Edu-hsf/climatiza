import { type Feature, type Location } from './location.types'

export function locationMapper(
  feature: Feature,
): Location {
  return {
    id:
      feature.id ??
      feature.properties.mapbox_id,

    name: feature.properties.name,

    address:
      feature.properties.full_address,

    city:
      feature.properties.context.place
        ?.name ??
      feature.properties.name,

    state:
      feature.properties.context.region
        ?.name,

    country:
      feature.properties.context.country
        ?.name ?? '',

    latitude:
      feature.properties.coordinates
        .latitude,

    longitude:
      feature.properties.coordinates
        .longitude,

    type:
      feature.properties.feature_type,
  }
}