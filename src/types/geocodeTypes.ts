import { CommonNominatimParamsSchema } from '@/types/commonTypes.js'
import { z } from 'zod'

export const GeocodeParamsSchema: z.ZodRawShape = {
  q: z.string().min(1),
  ...CommonNominatimParamsSchema,
  countrycodes: z.string().optional(),
  featureType: z.enum(['country', 'state', 'city', 'settlement']).optional(),
}

const _schema = z.object(GeocodeParamsSchema)
export type GeocodeParams = z.infer<typeof _schema>
