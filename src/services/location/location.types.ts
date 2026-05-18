type FeatureType =
  | 'country'
  | 'place'
  | 'street'
  | 'region'
  | 'postcode'
  | string

interface ContextItem {
  mapbox_id: string
  name: string
  wikidata_id?: string
  region_code?: string
  region_code_full?: string
  country_code?: string
  country_code_alpha_3?: string
}

interface Context {
  country?: ContextItem
  region?: ContextItem
  place?: ContextItem
  street?: ContextItem
  postcode?: ContextItem
  district?: ContextItem
  neighborhood?: ContextItem
  locality?: ContextItem
}

interface Coordinates {
  latitude: number
  longitude: number
}

interface Geometry {
  coordinates: [number, number]
  type: 'Point'
}

interface FeatureProperties {
  mapbox_id: string
  feature_type: FeatureType
  name: string
  name_preferred?: string
  full_address?: string
  place_formatted?: string
  context: Context
  coordinates: Coordinates
  bbox?: [number, number, number, number]
  language?: string
  maki?: string
  metadata?: Record<string, unknown>
}

export interface Feature {
  id?: string
  type: 'Feature'
  geometry: Geometry
  properties: FeatureProperties
}

export interface LocationAPI {
  type: 'FeatureCollection'
  features: Feature[]
  attribution: string
}

export interface Location {
  id: string
  name: string
  address?: string
  city?: string
  state?: string
  country: string
  latitude: number
  longitude: number
  type: string
}   