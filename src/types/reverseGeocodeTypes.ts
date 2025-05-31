import { z } from "zod"

export const ReverseGeocodeParams: z.ZodRawShape = {
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180),
  zoom: z.number().int().min(0).max(18).optional(),
  format: z.enum(["xml", "json", "jsonv2", "geojson", "geocodejson"]).default("jsonv2"),
  addressdetails: z.union([z.literal(0), z.literal(1)]).optional().default(0),
  extratags: z.union([z.literal(0), z.literal(1)]).optional().default(0),
  namedetails: z.union([z.literal(0), z.literal(1)]).optional().default(0),
  layer: z.enum(['address', 'poi', 'railway', 'natural', 'manmade']).optional(),
  polygon_geojson: z.union([z.literal(0), z.literal(1)]).optional().default(0),
  polygon_kml: z.union([z.literal(0), z.literal(1)]).optional().default(0),
  polygon_svg: z.union([z.literal(0), z.literal(1)]).optional().default(0),
  polygon_text: z.union([z.literal(0), z.literal(1)]).optional().default(0),
  polygon_threshold: z.number().min(0).optional().default(0.0),
}

const schema = z.object(ReverseGeocodeParams)
export type ReverseGeocodeParams = z.infer<typeof schema>;
