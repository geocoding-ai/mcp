# Geocoding MCP Desktop Extension (MCPB)

A Desktop Extension (MCPB) for geocoding and reverse geocoding using the OpenStreetMap Nominatim API. This extension provides MCP (Model Context Protocol) tools for converting addresses to coordinates and coordinates to addresses.

## Features

- **Geocoding**: Convert addresses or location descriptions to coordinates
- **Reverse Geocoding**: Convert coordinates (latitude/longitude) to addresses
- **Multiple Output Formats**: Support for JSON, GeoJSON, and GeocodeJSON formats
- **Detailed Address Information**: Optional address breakdowns, extra tags, and name details
- **Polygon Geometries**: Support for GeoJSON, KML, SVG, and WKT polygon outputs
- **Flexible Filtering**: Filter by country codes, layers (address, POI, railway, natural, manmade), and feature types

## Installation

### Prerequisites

- Claude Desktop (version 1.0.0 or higher)
- Node.js runtime (version 18.0.0 or higher)
- Compatible with macOS, Windows, and Linux

### Install the Extension

1. Download the `mcp.mcpb` file from this repository
2. Double-click the `.mcpb` file to open it with Claude Desktop
3. Follow the installation prompts in Claude Desktop
4. The extension will be automatically installed and configured

### Manual Installation

If you prefer to install manually:

1. Open Claude Desktop
2. Go to Settings → Extensions
3. Click "Install Extension"
4. Select the `mcp.mcpb` file
5. Confirm the installation

## Usage

Once installed, the extension provides two main tools:

### 1. Geocode Tool

Convert an address or location description to coordinates.

**Example Usage:**
```text
Geocode "1600 Amphitheatre Parkway, Mountain View, CA"
```

**Parameters:**
- `query` (required): Free-form string to search for
- `format`: Response format (xml, json, jsonv2, geojson, geocodejson)
- `addressdetails`: Include address breakdown (0 or 1)
- `extratags`: Include extra information (0 or 1)
- `namedetails`: Include full list of names (0 or 1)
- `countrycodes`: Filter by country codes (ISO 3166-1alpha2)
- `layer`: Filter by themes (address, poi, railway, natural, manmade)
- `featureType`: Fine-grained address selection (state, country, city, settlement)
- `polygon_*`: Add geometry in various formats

### 2. Reverse Geocode Tool

Convert coordinates to an address.

**Example Usage:**
```text
Reverse geocode coordinates 37.4224764, -122.0842499
```

**Parameters:**
- `lat` (required): Latitude in WGS84 projection
- `lon` (required): Longitude in WGS84 projection
- `zoom`: Level of detail (3=country, 18=buildings)
- `format`: Response format (xml, json, jsonv2, geojson, geocodejson)
- `addressdetails`: Include address breakdown (0 or 1)
- `extratags`: Include extra information (0 or 1)
- `namedetails`: Include full list of names (0 or 1)
- `layer`: Filter by themes (address, poi, railway, natural, manmade)
- `polygon_*`: Add geometry in various formats

## Zoom Levels for Reverse Geocoding

- **3**: Country
- **5**: State
- **8**: County
- **10**: City
- **12**: Town/Borough
- **13**: Village/Suburb
- **14**: Neighbourhood
- **15**: Any settlement
- **16**: Major streets
- **17**: Major and minor streets
- **18**: Buildings

## Output Formats

- **json**: Standard JSON format
- **jsonv2**: Enhanced JSON format (default)
- **geojson**: GeoJSON format
- **geocodejson**: GeocodeJSON format
- **xml**: XML format

## Data Source and License

This extension uses the OpenStreetMap Nominatim API:
- **Data**: © OpenStreetMap contributors
- **License**: ODbL 1.0
- **Copyright**: http://osm.org/copyright

## Development

### Building from Source

1. Clone the repository
2. Install dependencies: `bun install`
3. Build the project: `bun run build`
4. Create the MCPB package: `bunx @anthropic-ai/mcpb pack`

### Project Structure

```
├── manifest.json          # MCPB extension manifest
├── dist/                  # Compiled JavaScript files
│   ├── index.js           # Main entry point
│   ├── tools/             # MCP tool implementations
│   ├── clients/           # API client code
│   └── types/             # TypeScript type definitions
├── src/                   # Source TypeScript files
└── mcp.mcpb               # Generated MCPB extension file
```

### Testing

Run tests with:
```bash
bun test
```

Run type checking:
```bash
bun tsc
```

## Troubleshooting

### Common Issues

1. **Extension not loading**: Ensure Claude Desktop version is 1.0.0 or higher
2. **Node.js errors**: Verify Node.js version 16.0.0 or higher is installed
3. **API errors**: Check internet connection and Nominatim service availability

### Support

For issues and support:
- Check the [OpenStreetMap Nominatim documentation](https://nominatim.org/release-docs/latest/api/)
- Review the [MCP SDK documentation](https://github.com/modelcontextprotocol/typescript-sdk)
- File issues in the project repository

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
