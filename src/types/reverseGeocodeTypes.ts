import { z } from "zod"
import { CommonNominatimParamsSchema } from "./commonTypes.js"

export const ReverseGeocodeParamsSchema: z.ZodRawShape = {
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180),
  zoom: z.number().int().min(0).max(18).optional(),
  ...CommonNominatimParamsSchema,
}

const schema = z.object(ReverseGeocodeParamsSchema)
export type ReverseGeocodeParams = z.infer<typeof schema>;
