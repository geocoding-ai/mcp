#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { registerGeocodeTool } from '@/tools/geocode.js'
import { registerReverseGeocodeTool } from '@/tools/reverseGeocode.js'
import packageJson from '../package.json' with { type: 'json' }

const server = new McpServer({
  name: 'geocoding',
  version: packageJson.version,
  description: 'Geocoding API',
})

registerGeocodeTool(server)
registerReverseGeocodeTool(server)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.info('Geocoding API MCP Server running on stdio')
}

main().catch((error) => {
  console.error('Fatal error in main():', error)
  process.exit(1)
})
