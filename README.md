![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/geocoding-ai/mcp?utm_source=oss&utm_medium=github&utm_campaign=geocoding-ai%2Fmcp&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

# Geocoding MCP Server

This is a Model Context Protocol (MCP) server that provides geocoding services by integrating with the Nominatim API.

## Installation

### Requirements
- Node.js >= 18.0.0
- Cursor, Windsurf, Claude Desktop, Trae or another MCP Client

## Install in Claude Desktop
Add this to your Claude Desktop `claude_desktop_config.json` file. See [Claude Desktop MCP docs](https://modelcontextprotocol.io/quickstart/user) for more info.

```json
{
  "mcpServers": {
    "geocoding": {
      "command": "npx",
      "args": [
        "-y",
        "@geocoding-ai/mcp"
      ]
    }
  }
}
```

## License

Codebase: [MIT](./LICENSE)

Documentation: [GPLv2](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html) / [Nominatim developer community](https://github.com/osm-search/Nominatim) / [Nominatim Manual](https://nominatim.org/release-docs/latest/)
