import axios from 'axios'
import type { ReverseGeocodeParams } from '../types/reverseGeocodeTypes.js'
import type { GeocodeParams } from '../types/geocodeTypes.js'

const nominatimClient = axios.create({
  baseURL: 'https://nominatim.geocoding.ai/',
  headers: {
    'User-Agent': 'GeocodingMCP/1.0',
  },
})

const parseResult = (result: any[]) => {
  result.forEach((item: any) => {
    delete item.licence
  })

  return result
}

export const geocodeAddress = async (params: GeocodeParams) => {
  const response = await nominatimClient.get('search', { params })
  return parseResult(response.data)
}

export const reverseGeocode = async (params: ReverseGeocodeParams) => {
  const response = await nominatimClient.get('reverse', { params })
  return parseResult([response.data])
}
