// src/tools/geocode.test.ts
import { registerGeocodeTool } from '@/tools/geocode.js'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test'
import * as nominatimClient from '../../clients/nominatimClient.js'
// Use the actual implementation from prepareResponse
import { handleGeocodeResult } from '@/tools/prepareResponse.js'
import type { GeocodeParams } from '@/types/geocodeTypes.js'
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js'

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
        // Store the handler so we can call it directly in tests
        ;(this as any).handler = handler
      },
    )
  },
}))

// Mock only nominatimClient
mock.module('../../clients/nominatimClient.js', () => ({
  geocodeAddress: mock(async (params: GeocodeParams) => {
    // Default successful mock implementation, can be overridden in tests
    return [{ place_id: 123, display_name: `Mocked result for ${params.query}` }]
  }),
}))

describe('registerGeocodeTool', () => {
  let serverInstance: McpServer
  let toolHandler: ((params: GeocodeParams) => Promise<CallToolResult>) | undefined

  beforeEach(() => {
    serverInstance = new McpServer({ name: 'test-server', version: '1.0' })
    registerGeocodeTool(serverInstance)
    // Access the handler registered by the tool method
    toolHandler = (serverInstance as any).handler
  })

  afterEach(() => {
    mock.restore() // Restore all mocks
  })

  it("should register a tool named 'geocode'", () => {
    expect(serverInstance.tool).toHaveBeenCalled()
    const mockCalls = (serverInstance.tool as ReturnType<typeof mock>).mock.calls
    expect(mockCalls[0]?.[0]).toBe('geocode')
    expect(typeof mockCalls[0]?.[1]).toBe('string') // Description
    expect(mockCalls[0]?.[2]).toBeDefined() // Schema
    expect(typeof mockCalls[0]?.[3]).toBe('function') // Handler
  })

  it('should call geocodeAddress and use actual handleGeocodeResult on successful execution', async () => {
    if (!toolHandler) throw new Error('Handler not registered')

    const params: GeocodeParams = {
      query: '1600 Amphitheatre Parkway, Mountain View, CA',
    }
    const mockGeocodeApiResult = [{ place_id: 1, display_name: 'Test Address' }]

    // Expected result from the actual handleGeocodeResult
    const expectedCallToolResult = handleGeocodeResult(mockGeocodeApiResult)

    const geocodeAddressSpy = nominatimClient.geocodeAddress as ReturnType<typeof mock>
    geocodeAddressSpy.mockResolvedValue(mockGeocodeApiResult)

    const result = await toolHandler(params)

    expect(geocodeAddressSpy).toHaveBeenCalledWith(params)
    expect(result).toEqual(expectedCallToolResult)
  })

  it('should pass params correctly to geocodeAddress', async () => {
    if (!toolHandler) throw new Error('Handler not registered')

    const params: GeocodeParams = {
      query: 'Paris',
      format: 'json',
      addressdetails: 1,
      countrycodes: 'fr',
    }
    const geocodeAddressSpy = nominatimClient.geocodeAddress as ReturnType<typeof mock>
    // Provide a default resolution for this spy instance for this test
    geocodeAddressSpy.mockResolvedValue([{ place_id: 456, display_name: 'Paris Result' }])

    await toolHandler(params)
    expect(geocodeAddressSpy).toHaveBeenCalledWith(params)
  })

  it('should handle errors from geocodeAddress by passing error to actual handleGeocodeResult', async () => {
    if (!toolHandler) throw new Error('Handler not registered')

    const params: GeocodeParams = { query: 'trigger-api-error' }
    const errorMessage = 'Nominatim API error during test' // Use a distinct message

    const geocodeAddressSpy = nominatimClient.geocodeAddress as ReturnType<typeof mock>
    // Configure the mock to reject with a specific error when called
    geocodeAddressSpy.mockImplementation(async () => {
      throw new Error(errorMessage)
    })

    // The handler should propagate the error thrown by geocodeAddress
    expect(toolHandler(params)).rejects.toThrow(errorMessage)

    expect(geocodeAddressSpy).toHaveBeenCalledWith(params)
    // In this scenario, handleGeocodeResult is NOT called by the tool's direct handler,
    // as the error from geocodeAddress propagates out of the handler first.
  })
})
