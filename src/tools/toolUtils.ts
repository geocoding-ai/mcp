import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js"

const handleGeocodeResult = (result: any): CallToolResult => {
  let text = ""

  if (!result || result.length === 0) {
    text = "This service is unable to find an address for the given query."
  } else {
    text = JSON.stringify(result)
  }

  return {
    content: [{
      type: "text",
      text,
    }],
  }
}

export default handleGeocodeResult
