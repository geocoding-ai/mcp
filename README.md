![GitHub License](https://img.shields.io/github/license/geocoding-ai/mcp?link=https%3A%2F%2Fopensource.org%2Flicense%2FMIT)
![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/geocoding-ai/mcp?utm_source=oss&utm_medium=github&utm_campaign=geocoding-ai/mcp&labelColor=171717&color=FF570A&link=https://coderabbit.ai&label=CodeRabbit+Reviews) ![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/geocoding-ai/mcp/lint.yml?label=eslint)
![NPM Version](https://img.shields.io/npm/v/%40geocoding-ai%2Fmcp) ![NPM Last Update (with dist tag)](https://img.shields.io/npm/last-update/%40geocoding-ai%2Fmcp/latest?label=npm%20last%20published&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40geocoding-ai%2Fmcp)

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
