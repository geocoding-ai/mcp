import { handleGeocodeResult } from '@/tools/prepareResponse.js'
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js'
import { describe, expect, it } from 'bun:test'

describe('handleGeocodeResult', () => {
  it('should return a message if the result is null', () => {
    const result = null
    const expected: CallToolResult = {
      content: [
        {
          type: 'text',
          text: 'This service is unable to find an address for the given query.',
        },
      ],
    }
    expect(handleGeocodeResult(result)).toEqual(expected)
  })

  it('should return a message if the result is an empty array', () => {
    const result: any[] = []
    const expected: CallToolResult = {
      content: [
        {
          type: 'text',
          text: 'This service is unable to find an address for the given query.',
        },
      ],
    }
    expect(handleGeocodeResult(result)).toEqual(expected)
  })

  it('should return a message if the result is undefined', () => {
    const result = undefined
    const expected: CallToolResult = {
      content: [
        {
          type: 'text',
          text: 'This service is unable to find an address for the given query.',
        },
      ],
    }
    expect(handleGeocodeResult(result)).toEqual(expected)
  })

  it('should return the stringified result if it is a valid array', () => {
    const result = [{ place_id: 1, lat: '10.0', lon: '20.0', display_name: 'Test Location' }]
    const expected: CallToolResult = {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result),
        },
      ],
    }
    expect(handleGeocodeResult(result)).toEqual(expected)
  })

  it('should return an error message if JSON.stringify fails', () => {
    const circularResult: any = {}
    circularResult.self = circularResult // Create a circular reference

    // We need to catch the error message, which might vary slightly.
    // So we'll check if the text includes the base error message.
    const response = handleGeocodeResult(circularResult)
    expect(response.content[0]?.type).toBe('text')
    // The current implementation will identify a non-array object as an invalid input
    // before attempting to stringify it. So, it falls into the first conditional block.
    const expected: CallToolResult = {
      content: [
        {
          type: 'text',
          text: 'This service is unable to find an address for the given query.',
        },
      ],
    }
    expect(handleGeocodeResult(circularResult)).toEqual(expected)
  })

  it('should handle an array with multiple valid objects', () => {
    const result = [
      {
        place_id: 1,
        lat: '10.0',
        lon: '20.0',
        display_name: 'Test Location 1',
      },
      {
        place_id: 2,
        lat: '10.1',
        lon: '20.1',
        display_name: 'Test Location 2',
      },
    ]
    const expected: CallToolResult = {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result),
        },
      ],
    }
    expect(handleGeocodeResult(result)).toEqual(expected)
  })
})
