import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { registerGeocodeTool } from "./tools/geocode.js"
import { registerReverseGeocodeTool } from "./tools/reverseGeocode.js"

const server = new McpServer({
  name: "geocoding",
  version: "0.1.0",
  description: "Geocoding API",
})

registerGeocodeTool(server)
registerReverseGeocodeTool(server)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error("Geocoding API MCP Server running on stdio")
}

main().catch((error) => {
  console.error("Fatal error in main():", error)
  process.exit(1)
})
