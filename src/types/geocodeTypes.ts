import { z } from "zod"

export const GeocodeParams: z.ZodRawShape = {
  q: z.string().min(1),
  format: z.enum(['xml', 'json', 'jsonv2', 'geojson', 'geocodejson']).default('jsonv2'),
  addressdetails: z.union([z.literal(0), z.literal(1)]).optional().default(0),
  extratags: z.union([z.literal(0), z.literal(1)]).optional().default(0),
  namedetails: z.union([z.literal(0), z.literal(1)]).optional().default(0),
  countrycodes: z.string().optional(),
  layer: z.enum(['address', 'poi', 'railway', 'natural', 'man_made']).optional(),
  featureType: z.enum(['country', 'state', 'city', 'settlement']).optional(),
  polygon_geojson: z.union([z.literal(0), z.literal(1)]).optional().default(0),
  polygon_kml: z.union([z.literal(0), z.literal(1)]).optional().default(0),
  polygon_svg: z.union([z.literal(0), z.literal(1)]).optional().default(0),
  polygon_text: z.union([z.literal(0), z.literal(1)]).optional().default(0),
  polygon_threshold: z.number().min(0).optional().default(0.0),
}

const schema = z.object(GeocodeParams)
export type GeocodeParams = z.infer<typeof schema>;
