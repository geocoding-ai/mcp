// src/tools/reverseGeocode.test.ts
import { handleGeocodeResult } from '@/tools/prepareResponse.js' // Using actual implementation
import { registerReverseGeocodeTool } from '@/tools/reverseGeocode.js'
import type { ReverseGeocodeParams } from '@/types/reverseGeocodeTypes.js'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js'
import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test'
import * as nominatimClient from '../../clients/nominatimClient.js'

// Mock McpServer to capture the handler
mock.module('@modelcontextprotocol/sdk/server/mcp.js', () => ({
  McpServer: class {
    tool = mock(
      (
        _name: string,
        _description: string,
        _schema: any,
        handler: (params: any) => Promise<CallToolResult>,
      ) => {
        ;(this as any).handler = handler
      },
    )
  },
}))

// Mock only nominatimClient
mock.module('../../clients/nominatimClient.js', () => ({
  // Also mock geocodeAddress to avoid interference if it's imported by other modules under test
  geocodeAddress: mock(async (params: any) => [
    { place_id: 999, display_name: `Geocode mock for ${params.query}` },
  ]),
  reverseGeocode: mock(async (params: ReverseGeocodeParams) => {
    // Default successful mock implementation
    return {
      place_id: 456,
      display_name: `Address for ${params.lat},${params.lon}`,
    }
  }),
}))

describe('registerReverseGeocodeTool', () => {
  let serverInstance: McpServer
  let toolHandler: ((params: ReverseGeocodeParams) => Promise<CallToolResult>) | undefined

  beforeEach(() => {
    serverInstance = new McpServer({ name: 'test-server', version: '1.0' })
    registerReverseGeocodeTool(serverInstance)
    toolHandler = (serverInstance as any).handler
  })

  afterEach(() => {
    mock.restore() // Restore all mocks
  })

  it("should register a tool named 'reverse_geocode'", () => {
    expect(serverInstance.tool).toHaveBeenCalled()
    const mockCalls = (serverInstance.tool as ReturnType<typeof mock>).mock.calls
    expect(mockCalls[0]?.[0]).toBe('reverse_geocode')
    expect(typeof mockCalls[0]?.[1]).toBe('string') // Description
    expect(mockCalls[0]?.[2]).toBeDefined() // Schema
    expect(typeof mockCalls[0]?.[3]).toBe('function') // Handler
  })

  it('should call reverseGeocode and use actual handleGeocodeResult on successful execution', async () => {
    if (!toolHandler) throw new Error('Handler not registered')

    const params: ReverseGeocodeParams = { lat: '40.7128', lon: '-74.0060' }
    const mockReverseGeocodeApiResult = {
      place_id: 1,
      display_name: 'New York, NY',
    }

    const expectedCallToolResult = handleGeocodeResult(mockReverseGeocodeApiResult)

    const reverseGeocodeSpy = nominatimClient.reverseGeocode as ReturnType<typeof mock>
    reverseGeocodeSpy.mockResolvedValue(mockReverseGeocodeApiResult)

    const result = await toolHandler(params)

    expect(reverseGeocodeSpy).toHaveBeenCalledWith(params)
    expect(result).toEqual(expectedCallToolResult)
  })

  it('should pass params correctly to reverseGeocode', async () => {
    if (!toolHandler) throw new Error('Handler not registered')

    const params: ReverseGeocodeParams = {
      lat: '48.8566',
      lon: '2.3522',
      zoom: 10,
      format: 'jsonv2',
    }
    const reverseGeocodeSpy = nominatimClient.reverseGeocode as ReturnType<typeof mock>
    reverseGeocodeSpy.mockResolvedValue({
      place_id: 789,
      display_name: 'Paris Result',
    })

    await toolHandler(params)
    expect(reverseGeocodeSpy).toHaveBeenCalledWith(params)
  })

  it('should handle errors from reverseGeocode by propagating the error', async () => {
    if (!toolHandler) throw new Error('Handler not registered')

    const params: ReverseGeocodeParams = { lat: '0', lon: '0' } // Params to trigger error
    const errorMessage = 'Nominatim API error for reverse geocode'

    const reverseGeocodeSpy = nominatimClient.reverseGeocode as ReturnType<typeof mock>
    reverseGeocodeSpy.mockImplementation(async () => {
      throw new Error(errorMessage)
    })

    expect(toolHandler(params)).rejects.toThrow(errorMessage)

    expect(reverseGeocodeSpy).toHaveBeenCalledWith(params)
  })
})
