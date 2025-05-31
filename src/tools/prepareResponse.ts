import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js"

export const handleGeocodeResult = (result: any): CallToolResult => {
  let text = ""

  if (!result || !Array.isArray(result) || result.length === 0) {
    text = "This service is unable to find an address for the given query."
  } else {
    try {
      text = JSON.stringify(result)
    } catch (error) {
      text = `This service is unable to format the response as JSON. Error serializing geocode result: ${error instanceof Error ? error.message : String(error)}`
    }
  }

  return {
    content: [{
      type: "text",
      text,
    }],
  }
}
